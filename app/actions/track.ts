'use server'

import { prisma } from '@/lib/prisma'

/**
 * Public order lookup.
 *
 * SECURITY: order ids are guessable enough that an id alone must never be
 * sufficient — the email must match too, or anyone could enumerate customers'
 * names, phone numbers and addresses. The failure message is deliberately the
 * same for "no such order" and "wrong email", so this cannot be used to test
 * whether an order id exists.
 */

export interface TrackedOrder {
  reference: string
  status: string
  placedAt: string
  items: { name: string; variant: string; quantity: number; lineTotal: number }[]
  subtotal: number
  shipping: number
  total: number
  gstAmount: number
  gstRate: number
  city: string
  state: string
  pinCode: string
  awbNumber: string | null
  trackingUrl: string | null
  isMockShipment: boolean
  timeline: { label: string; at: string | null; done: boolean }[]
  returnStatus: string | null
}

const GENERIC_FAILURE =
  'We could not find an order with that reference and email. Please check both and try again.'

export async function lookupOrder(
  rawReference: string,
  rawEmail: string
): Promise<{ ok: true; order: TrackedOrder } | { ok: false; message: string }> {
  const reference = String(rawReference ?? '').trim().replace(/^#/, '')
  const email = String(rawEmail ?? '').trim().toLowerCase()

  if (reference.length < 6 || !email.includes('@')) {
    return { ok: false, message: GENERIC_FAILURE }
  }

  // Customers are shown the last 8 characters, so accept that or the full id.
  const candidates = await prisma.order.findMany({
    where: {
      OR: [{ id: reference }, { id: { endsWith: reference } }],
    },
    include: { items: true, returnTicket: true },
    take: 5,
  })

  const order = candidates.find((o) => o.customerEmail.toLowerCase() === email)

  if (!order) {
    return { ok: false, message: GENERIC_FAILURE }
  }

  const isMockShipment = Boolean(order.awbNumber?.startsWith('MOCK-'))

  const timeline = [
    { label: 'Order placed', at: order.createdAt, done: true },
    {
      label: 'Payment confirmed',
      at: order.razorpayPaymentId ? order.updatedAt : null,
      done: Boolean(order.razorpayPaymentId),
    },
    {
      label: 'Dispatched',
      at: order.shippedAt,
      done: Boolean(order.shippedAt),
    },
    {
      label: 'Delivered',
      at: order.deliveredAt,
      done: Boolean(order.deliveredAt),
    },
  ].map((t) => ({
    label: t.label,
    at: t.at ? t.at.toISOString() : null,
    done: t.done,
  }))

  return {
    ok: true,
    order: {
      reference: order.id.slice(-8),
      status: order.status,
      placedAt: order.createdAt.toISOString(),
      items: order.items.map((i) => ({
        name: i.name,
        variant: i.variant,
        quantity: i.quantity,
        lineTotal: i.price * i.quantity,
      })),
      subtotal: order.subtotal,
      shipping: order.shippingCharge,
      total: order.totalAmount,
      gstAmount: order.gstAmount,
      gstRate: order.gstRate,
      city: order.shippingCity,
      state: order.shippingState,
      pinCode: order.shippingPinCode,
      awbNumber: order.awbNumber,
      // Generate appropriate tracking URL for Amazon Shipping or Delhivery/Carrier
      trackingUrl:
        order.awbNumber && !isMockShipment
          ? order.awbNumber.startsWith('AMZN')
            ? 'https://track.amazon.in/'
            : `https://www.delhivery.com/track/package/${order.awbNumber}`
          : null,
      isMockShipment,
      timeline,
      returnStatus: order.returnTicket?.status ?? null,
    },
  }
}
