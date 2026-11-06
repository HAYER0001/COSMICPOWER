import { Resend } from 'resend'
import { site } from '@/content/site'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

const FROM = process.env.ORDER_EMAIL_FROM || 'Golden Deer <orders@cosmicpower.ltd>'
const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.cosmicpower.ltd'

/** Customer-facing reference — the last 8 chars, matching the tracking form. */
const ref = (id: string) => id.slice(-8)

interface OrderLike {
  id: string
  totalAmount: number
  subtotal: number
  shippingCharge: number
  gstAmount: number
  gstRate: number
  customerName: string
  customerEmail: string
  shippingAddress: string
  shippingCity: string
  shippingState: string
  shippingPinCode: string
  items: { name: string; variant: string; price: number; quantity: number }[]
}

function inr(n: number) {
  return `₹${n.toLocaleString('en-IN')}`
}

/**
 * Email the customer their receipt. Never throws — a mail failure must not roll
 * back a captured payment.
 */
export async function sendOrderConfirmation(order: OrderLike): Promise<void> {
  if (!resend) {
    console.warn('[email] RESEND_API_KEY not set — skipping order confirmation.')
    return
  }

  const rows = order.items
    .map(
      (item) => `
        <tr>
          <td style="padding:8px 0;color:#101410;">
            ${item.quantity}&times; ${item.name}
            <span style="color:#5C635C;">(${item.variant})</span>
          </td>
          <td style="padding:8px 0;text-align:right;color:#101410;">
            ${inr(item.price * item.quantity)}
          </td>
        </tr>`
    )
    .join('')

  const html = `
  <div style="font-family:Inter,system-ui,sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#F5EFE2;color:#101410;">
    <h1 style="font-family:Georgia,serif;color:#0F2E1E;font-size:26px;margin:0 0 4px;">Thank you, ${order.customerName.split(' ')[0]}.</h1>
    <p style="color:#5C635C;margin:0 0 24px;">Your Golden Deer order is confirmed.</p>

    <div style="background:#fff;border-radius:12px;padding:20px;margin-bottom:20px;">
      <p style="margin:0 0 12px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#5C635C;">
        Order <strong style="color:#0F2E1E;letter-spacing:0;">${ref(order.id)}</strong>
      </p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        ${rows}
        <tr><td colspan="2" style="border-top:1px solid #E5DCC8;padding-top:8px;"></td></tr>
        <tr>
          <td style="padding:4px 0;color:#5C635C;">Subtotal</td>
          <td style="padding:4px 0;text-align:right;color:#5C635C;">${inr(order.subtotal)}</td>
        </tr>
        <tr>
          <td style="padding:4px 0;color:#5C635C;">Shipping</td>
          <td style="padding:4px 0;text-align:right;color:#5C635C;">
            ${order.shippingCharge === 0 ? 'Free' : inr(order.shippingCharge)}
          </td>
        </tr>
        <tr>
          <td style="padding:8px 0;font-weight:600;color:#0F2E1E;">Total paid</td>
          <td style="padding:8px 0;text-align:right;font-weight:600;color:#0F2E1E;">${inr(order.totalAmount)}</td>
        </tr>
        <tr>
          <td colspan="2" style="padding:2px 0;text-align:right;font-size:11px;color:#5C635C;">
            Inclusive of ${inr(order.gstAmount)} GST (${order.gstRate}%)
          </td>
        </tr>
      </table>
    </div>

    <div style="background:#fff;border-radius:12px;padding:20px;margin-bottom:24px;">
      <p style="margin:0 0 8px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#5C635C;">Shipping to</p>
      <p style="margin:0;font-size:14px;line-height:1.6;">
        ${order.customerName}<br>
        ${order.shippingAddress}<br>
        ${order.shippingCity}, ${order.shippingState} ${order.shippingPinCode}
      </p>
    </div>

    <p style="text-align:center;margin:0 0 20px;">
      <a href="${SITE}/track"
         style="display:inline-block;background:#0F2E1E;color:#E8C97A;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;font-weight:500;">
        Track your order
      </a>
    </p>
    <p style="color:#5C635C;font-size:13px;line-height:1.6;margin:0 0 8px;text-align:center;">
      Use reference <strong style="color:#0F2E1E;">${ref(order.id)}</strong> and this email address.
    </p>
    <p style="color:#5C635C;font-size:13px;line-height:1.6;margin:0 0 8px;">
      We'll email your tracking number as soon as the parcel is picked up.
      Questions? Just reply to this email.
    </p>
    <p style="color:#5C635C;font-size:11px;margin:16px 0 0;">
      ${site.legal.company} &middot; GSTIN ${site.legal.gstin} &middot; FSSAI ${site.legal.fssaiLicense}
    </p>
  </div>`

  try {
    await resend.emails.send({
      from: FROM,
      to: order.customerEmail,
      subject: `Order confirmed — Golden Deer #${ref(order.id)}`,
      html,
    })
  } catch (error) {
    console.error('[email] order confirmation failed:', error)
  }
}

/** Notify the customer that their parcel is on its way. */
export async function sendShippingNotification(
  order: Pick<OrderLike, 'id' | 'customerName' | 'customerEmail'>,
  awb: string
): Promise<void> {
  if (!resend) return

  try {
    await resend.emails.send({
      from: FROM,
      to: order.customerEmail,
      subject: `Your Golden Deer order has shipped — #${ref(order.id)}`,
      html: `
        <div style="font-family:Inter,system-ui,sans-serif;max-width:560px;margin:0 auto;padding:32px;background:#F5EFE2;color:#101410;">
          <h1 style="font-family:Georgia,serif;color:#0F2E1E;font-size:24px;margin:0 0 12px;">It's on the way.</h1>
          <p style="color:#5C635C;line-height:1.6;margin:0 0 20px;">
            ${order.customerName}, order <strong style="color:#0F2E1E;">${ref(order.id)}</strong> has been dispatched via our courier partner.
          </p>
          <div style="background:#fff;border-radius:12px;padding:20px;margin-bottom:20px;">
            <p style="margin:0 0 6px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#5C635C;">Tracking number</p>
            <p style="margin:0;font-family:monospace;font-size:16px;color:#0F2E1E;">${awb}</p>
          </div>
          <p style="text-align:center;margin:0 0 20px;">
            ${
              awb.startsWith('AMZN')
                ? `<a href="https://track.amazon.in/" style="display:inline-block;background:#0F2E1E;color:#E8C97A;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;">Track with Amazon Shipping</a>`
                : awb.startsWith('MOCK-')
                ? `<a href="${SITE}/track" style="display:inline-block;background:#0F2E1E;color:#E8C97A;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;">View order status</a>`
                : `<a href="https://www.delhivery.com/track/package/${awb}" style="display:inline-block;background:#0F2E1E;color:#E8C97A;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:14px;">Track with Courier</a>`
            }
          </p>
          <p style="color:#5C635C;font-size:13px;text-align:center;margin:0;">
            Or check status any time at <a href="${SITE}/track" style="color:#8C6A1D;">${SITE.replace(/^https?:\/\//, '')}/track</a>
          </p>
        </div>`,
    })
  } catch (error) {
    console.error('[email] shipping notification failed:', error)
  }
}
