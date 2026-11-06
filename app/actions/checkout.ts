'use server'

import { razorpay } from '@/lib/razorpay'
import { prisma } from '@/lib/prisma'
import { priceCart, toPaise, PricingError, type CartLineInput } from '@/lib/pricing'
import { checkPincodeServiceability } from '@/lib/delhivery'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export interface CreateOrderInput {
  /** Only identifiers and quantity — prices are resolved server-side. */
  items: CartLineInput[]
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingAddress: string
  shippingCity: string
  shippingState: string
  shippingPinCode: string
}

export type CreateOrderResult =
  | {
      ok: true
      orderId: string
      razorpayOrderId: string
      keyId: string
      amount: number
      currency: string
      subtotal: number
      shipping: number
      total: number
    }
  | {
      ok: false
      error: string
    }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_RE = /^[6-9]\d{9}$/
const PINCODE_RE = /^[1-9]\d{5}$/

function clean(value: unknown, field: string, min = 2, max = 200): string {
  const str = typeof value === 'string' ? value.trim() : ''
  if (str.length < min) throw new Error(`${field} is required`)
  if (str.length > max) throw new Error(`${field} is too long`)
  return str
}

export async function createOrder(data: CreateOrderInput): Promise<CreateOrderResult> {
  try {
    // ---- Validate the customer ------------------------------------------------
    const customerName = clean(data.customerName, 'Full name')
    const customerEmail = clean(data.customerEmail, 'Email address', 5)
    const shippingAddress = clean(data.shippingAddress, 'Street address', 5, 500)
    const shippingCity = clean(data.shippingCity, 'City')
    const shippingState = clean(data.shippingState, 'State')

    if (!EMAIL_RE.test(customerEmail)) {
      return { ok: false, error: 'Please enter a valid email address' }
    }

    // Accept +91 / 91 / 0 prefixes, spaces, brackets, and dashes, store the bare 10 digits.
    const customerPhone = String(data.customerPhone ?? '')
      .replace(/[\s\-()+]/g, '')
      .replace(/^(91|0)/, '')
    if (!PHONE_RE.test(customerPhone)) {
      return { ok: false, error: 'Please enter a valid 10-digit Indian mobile number' }
    }

    const shippingPinCode = String(data.shippingPinCode ?? '').trim()
    if (!PINCODE_RE.test(shippingPinCode)) {
      return { ok: false, error: 'Please enter a valid 6-digit PIN code' }
    }

    if (!(await checkPincodeServiceability(shippingPinCode))) {
      return {
        ok: false,
        error: `We do not deliver to ${shippingPinCode} yet. Please contact us on WhatsApp.`,
      }
    }

    // ---- Re-price the cart from scratch --------------------------------------
    let priced
    try {
      priced = priceCart(data.items)
    } catch (error) {
      return {
        ok: false,
        error: error instanceof PricingError ? error.message : 'Invalid cart pricing',
      }
    }

    const amountInPaise = toPaise(priced.total)
    if (amountInPaise < 100) {
      return { ok: false, error: 'Invalid order amount' }
    }

    // ---- Create the Razorpay order -------------------------------------------
    let rzpOrder
    try {
      rzpOrder = await razorpay.orders.create({
        amount: amountInPaise,
        currency: 'INR',
        receipt: `rcpt_${Date.now()}`,
        notes: { customerEmail, customerPhone },
      })
    } catch (error) {
      const status = (error as { statusCode?: number })?.statusCode
      const description = (error as { error?: { description?: string } })?.error?.description
      console.error('[checkout] Razorpay order creation failed:', description ?? error)

      if (status === 401) {
        return {
          ok: false,
          error: 'Razorpay authentication failed. Please verify live keys.',
        }
      }

      return {
        ok: false,
        error: description ?? 'Could not start payment with Razorpay. Please try again.',
      }
    }

    // ---- Persist ---------------------------------------------------------------
    let userId: string | null = null
    try {
      const session = await getServerSession(authOptions)
      if (session?.user?.id && session.user.id !== 'admin') {
        userId = session.user.id
      } else {
        const existingUser = await prisma.user.findUnique({
          where: { email: customerEmail.toLowerCase() },
          select: { id: true },
        })
        if (existingUser) {
          userId = existingUser.id
        }
      }
    } catch {
      // Non-fatal if session or user lookup fails
    }

    let order
    try {
      order = await prisma.order.create({
        data: {
          razorpayOrderId: rzpOrder.id,
          userId,
          subtotal: priced.subtotal,
          shippingCharge: priced.shipping,
          totalAmount: priced.total,
          taxableValue: priced.taxableValue,
          gstAmount: priced.gstAmount,
          gstRate: priced.gstRate,
          customerName,
          customerEmail,
          customerPhone,
          shippingAddress,
          shippingCity,
          shippingState,
          shippingPinCode,
          items: {
            create: priced.lines.map((line) => ({
              productSlug: line.productSlug,
              name: line.name,
              variant: line.variant,
              price: line.price,
              quantity: line.quantity,
            })),
          },
        },
      })
    } catch (error) {
      console.error('[checkout] Database order persistence failed:', error)
      return {
        ok: false,
        error: 'Database persistence failed. Please verify Neon connection.',
      }
    }

    return {
      ok: true,
      orderId: order.id,
      razorpayOrderId: rzpOrder.id,
      keyId:
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ||
        process.env.RAZORPAY_KEY_ID ||
        'rzp_live_TwrQf8oGtmfc8o',
      amount: Number(rzpOrder.amount),
      currency: rzpOrder.currency,
      subtotal: priced.subtotal,
      shipping: priced.shipping,
      total: priced.total,
    }
  } catch (error) {
    console.error('[checkout] Unexpected error in createOrder:', error)
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Could not start checkout. Please try again.',
    }
  }
}

/**
 * Quote a cart without creating anything — used to render the order summary so
 * the totals the customer sees are the same ones the server will charge.
 */
export async function quoteCart(items: CartLineInput[]) {
  try {
    const { subtotal, shipping, total, lines, gstAmount, gstRate } = priceCart(items)
    return { ok: true as const, subtotal, shipping, total, lines, gstAmount, gstRate }
  } catch (error) {
    const message = error instanceof PricingError ? error.message : 'Could not price this cart'
    return { ok: false as const, message }
  }
}
