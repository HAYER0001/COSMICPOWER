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
  customerPhone?: string | null
  shippingAddress: string
  shippingCity: string
  shippingState: string
  shippingPinCode: string
  razorpayPaymentId?: string | null
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

const ADMIN_NOTIFICATION_RECIPIENT =
  process.env.ADMIN_ORDER_NOTIFICATION_EMAIL || 'chandan@cosmicpower.ltd'

/**
 * Notify Chandan / store admin that a new paid order has arrived,
 * with full item packing list, delivery address, and 1-click courier links.
 */
export async function sendAdminOrderNotification(order: OrderLike): Promise<void> {
  if (!resend) {
    console.warn('[email] RESEND_API_KEY not set — skipping admin order notification.')
    return
  }

  const phoneBare = (order.customerPhone || '').replace(/\D/g, '')
  const totalUnits = order.items.reduce((sum, item) => sum + item.quantity, 0)

  const itemsRows = order.items
    .map(
      (item) => `
        <tr style="border-bottom:1px solid #f0eade;">
          <td style="padding:10px 0;color:#101410;">
            <strong style="color:#0F2E1E;font-size:15px;">${item.quantity}&times; ${item.name}</strong><br>
            <span style="color:#777;font-size:13px;">Pack / Size: ${item.variant}</span>
          </td>
          <td style="padding:10px 0;text-align:right;color:#0F2E1E;font-weight:600;font-size:14px;">
            ${inr(item.price * item.quantity)}
          </td>
        </tr>`
    )
    .join('')

  const itemsSummary = order.items
    .map((item) => `${item.quantity}x ${item.name} (${item.variant})`)
    .join(', ')

  const html = `
  <div style="font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;max-width:620px;margin:0 auto;padding:24px;background:#F8F6F0;color:#101410;border-radius:12px;">
    <!-- Brand Alert Banner -->
    <div style="background:#0F2E1E;padding:22px;border-radius:10px;text-align:center;color:#E8C97A;margin-bottom:20px;">
      <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#C9A24B;">🚨 New Website Order</p>
      <h1 style="font-family:Georgia,serif;font-size:24px;margin:0 0 6px;color:#FFFFFF;">Order #${ref(order.id)} Received</h1>
      <p style="margin:0;font-size:15px;color:#E8C97A;font-weight:600;">₹${order.totalAmount.toLocaleString('en-IN')} &bull; Payment Verified (Razorpay)</p>
    </div>

    <!-- Quick Action Launchpad -->
    <div style="text-align:center;margin-bottom:24px;">
      <a href="${SITE}/admin/orders/${order.id}" style="display:inline-block;background:#0F2E1E;color:#E8C97A;padding:10px 18px;border-radius:6px;font-size:13px;font-weight:600;text-decoration:none;margin:4px;">
        Open in Admin Portal &rarr;
      </a>
      <a href="${SITE}/admin/orders/${order.id}/invoice" style="display:inline-block;background:#C9A24B;color:#0F2E1E;padding:10px 18px;border-radius:6px;font-size:13px;font-weight:600;text-decoration:none;margin:4px;">
        Print GST Tax Invoice
      </a>
      ${
        phoneBare
          ? `<a href="https://wa.me/${phoneBare}" style="display:inline-block;background:#25D366;color:#ffffff;padding:10px 18px;border-radius:6px;font-size:13px;font-weight:600;text-decoration:none;margin:4px;">WhatsApp Buyer</a>`
          : ''
      }
    </div>

    <!-- What to Send (Packing Checklist) -->
    <div style="background:#ffffff;border-radius:10px;padding:20px;margin-bottom:20px;border:1px solid #E5DCC8;">
      <h2 style="font-size:13px;letter-spacing:0.1em;text-transform:uppercase;color:#0F2E1E;margin:0 0 12px;border-bottom:2px solid #E8C97A;padding-bottom:6px;">
        📦 What to Pack (${totalUnits} total packs)
      </h2>
      <table style="width:100%;border-collapse:collapse;">
        ${itemsRows}
      </table>
      <div style="margin-top:12px;padding-top:12px;border-top:1px solid #E5DCC8;display:flex;justify-content:space-between;font-size:13px;color:#555;">
        <span>Subtotal: ${inr(order.subtotal)} | Shipping: ${order.shippingCharge === 0 ? 'Free' : inr(order.shippingCharge)}</span>
        <strong style="color:#0F2E1E;font-size:14px;">Total Collected: ${inr(order.totalAmount)}</strong>
      </div>
    </div>

    <!-- Customer Shipping Address -->
    <div style="background:#ffffff;border-radius:10px;padding:20px;margin-bottom:20px;border:1px solid #E5DCC8;">
      <h2 style="font-size:13px;letter-spacing:0.1em;text-transform:uppercase;color:#0F2E1E;margin:0 0 12px;border-bottom:2px solid #E8C97A;padding-bottom:6px;">
        📍 Customer Shipping Destination
      </h2>
      <p style="margin:0 0 4px;font-size:16px;font-weight:bold;color:#0F2E1E;">${order.customerName}</p>
      <p style="margin:0 0 4px;font-size:14px;color:#333;">Mobile: <strong style="color:#0F2E1E;">${order.customerPhone || 'N/A'}</strong></p>
      <p style="margin:0 0 12px;font-size:14px;color:#555;">Email: <a href="mailto:${order.customerEmail}" style="color:#8C6A1D;">${order.customerEmail}</a></p>

      <div style="background:#F6F3EC;padding:14px;border-radius:8px;border:1px solid #E5DCC8;font-size:14px;line-height:1.6;color:#101410;">
        <strong>Dispatch Address:</strong><br>
        ${order.shippingAddress}<br>
        ${order.shippingCity}, ${order.shippingState}<br>
        <strong>PIN Code: ${order.shippingPinCode}</strong>
      </div>
    </div>

    <!-- 1-Click Copy-Paste Block for Shiprocket / Courier Booking -->
    <div style="background:#EBF3EF;border-radius:10px;padding:18px;margin-bottom:20px;border:1px solid #B8D6C5;">
      <p style="margin:0 0 8px;font-size:12px;font-weight:bold;color:#0F2E1E;text-transform:uppercase;letter-spacing:0.05em;">
        📋 Fast Copy for Shiprocket / Amazon Shipping / Delhivery:
      </p>
      <pre style="margin:0;font-family:ui-monospace,Menlo,Monaco,monospace;font-size:12px;line-height:1.6;background:#ffffff;padding:12px;border-radius:6px;border:1px solid #CFE2D7;white-space:pre-wrap;color:#101410;">Customer: ${order.customerName}
Phone: ${order.customerPhone || ''}
Address: ${order.shippingAddress}
City: ${order.shippingCity}
State: ${order.shippingState}
Pincode: ${order.shippingPinCode}
Items: ${itemsSummary}
Payment Type: Prepaid (Razorpay ${order.razorpayPaymentId || ''})
Invoice Value: ₹${order.totalAmount}</pre>
    </div>

    <!-- Courier Portals Shortcut -->
    <div style="background:#ffffff;border-radius:10px;padding:16px;margin-bottom:16px;border:1px solid #E5DCC8;text-align:center;">
      <p style="margin:0 0 10px;font-size:12px;font-weight:bold;color:#666;text-transform:uppercase;">
        Schedule Pickup on Courier Portals:
      </p>
      <a href="https://app.shiprocket.in/seller/orders" target="_blank" style="display:inline-block;background:#7B2CBF;color:#ffffff;padding:8px 14px;border-radius:6px;font-size:12px;font-weight:600;text-decoration:none;margin:3px;">
        Shiprocket Orders
      </a>
      <a href="https://ship.amazon.in" target="_blank" style="display:inline-block;background:#FF9900;color:#101410;padding:8px 14px;border-radius:6px;font-size:12px;font-weight:600;text-decoration:none;margin:3px;">
        Amazon Shipping
      </a>
      <a href="https://one.delhivery.com" target="_blank" style="display:inline-block;background:#E63946;color:#ffffff;padding:8px 14px;border-radius:6px;font-size:12px;font-weight:600;text-decoration:none;margin:3px;">
        Delhivery One
      </a>
    </div>

    <p style="text-align:center;font-size:11px;color:#888;margin:16px 0 0;">
      Golden Deer E-Commerce System &bull; Cosmic Power Pvt. Ltd. &bull; Masaurhi, Bihar
    </p>
  </div>`

  try {
    await resend.emails.send({
      from: FROM,
      to: ADMIN_NOTIFICATION_RECIPIENT,
      subject: `🚨 NEW ORDER #${ref(order.id)} (₹${order.totalAmount}) — Dispatch Needed`,
      html,
    })
    console.log(`[email] Admin notification sent to ${ADMIN_NOTIFICATION_RECIPIENT} for order #${ref(order.id)}`)
  } catch (error) {
    console.error('[email] admin order notification failed:', error)
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
