'use server'

import { razorpay } from '@/lib/razorpay'
import { prisma } from '@/lib/prisma'
import { priceCart, toPaise, PricingError, type CartLineInput } from '@/lib/pricing'
import { checkPincodeServiceability } from '@/lib/delhivery'

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

export interface CreateOrderResult {
  orderId: string
  razorpayOrderId: string
  keyId: string
  /** Amount in paise, as Razorpay expects. */
  amount: number
  currency: string
  subtotal: number
  shipping: number
  total: number
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
  // ---- Validate the customer ------------------------------------------------
  const customerName = clean(data.customerName, 'Full name')
  const customerEmail = clean(data.customerEmail, 'Email address', 5)
  const shippingAddress = clean(data.shippingAddress, 'Street address', 5, 500)
  const shippingCity = clean(data.shippingCity, 'City')
  const shippingState = clean(data.shippingState, 'State')

  if (!EMAIL_RE.test(customerEmail)) {
    throw new Error('Please enter a valid email address')
  }

  // Accept +91 / 91 / 0 prefixes, spaces, brackets, and dashes, store the bare 10 digits.
  const customerPhone = String(data.customerPhone ?? '')
    .replace(/[\s\-()+]/g, '')
    .replace(/^(91|0)/, '')
  if (!PHONE_RE.test(customerPhone)) {
    throw new Error('Please enter a valid 10-digit Indian mobile number')
  }

  const shippingPinCode = String(data.shippingPinCode ?? '').trim()
  if (!PINCODE_RE.test(shippingPinCode)) {
    throw new Error('Please enter a valid 6-digit PIN code')
  }

  if (!(await checkPincodeServiceability(shippingPinCode))) {
    throw new Error(
      `We do not deliver to ${shippingPinCode} yet. Please contact us on WhatsApp.`
    )
  }

  // ---- Re-price the cart from scratch --------------------------------------
  // Whatever prices the browser sent are ignored; these come from content/products.ts.
  let priced
  try {
    priced = priceCart(data.items)
  } catch (error) {
    if (error instanceof PricingError) throw new Error(error.message)
    throw error
  }

  const amountInPaise = toPaise(priced.total)

  // Razorpay rejects anything under 100 paise. Our cheapest possible order is
  // ₹178, so this can only fire if pricing data is corrupted — fail loudly.
  if (amountInPaise < 100) {
    throw new Error('Invalid order amount')
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

    if (status === 401) {
      console.error('[checkout] Razorpay rejected our credentials — check RAZORPAY_KEY_ID/SECRET.')
      throw new Error('Payments are temporarily unavailable. Please try again shortly.')
    }

    console.error('[checkout] Razorpay order creation failed:', description ?? error)
    throw new Error(description ?? 'Could not start payment. Please try again.')
  }

  // ---- Persist ---------------------------------------------------------------
  let order
  try {
    order = await prisma.order.create({
      data: {
        razorpayOrderId: rzpOrder.id,
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
    throw new Error('Database service is temporarily unavailable. Please verify DATABASE_URL connection.')
  }

  return {
    orderId: order.id,
    razorpayOrderId: rzpOrder.id,
    keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || '',
    amount: Number(rzpOrder.amount),
    currency: rzpOrder.currency,
    subtotal: priced.subtotal,
    shipping: priced.shipping,
    total: priced.total,
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
