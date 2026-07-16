import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const rateLimit = new Map<string, number[]>()

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const windowMs = 60 * 60 * 1000
  const maxRequests = 5

  const timestamps = rateLimit.get(ip) ?? []
  const recent = timestamps.filter((t) => now - t < windowMs)
  rateLimit.set(ip, recent)

  if (recent.length >= maxRequests) return true
  recent.push(now)
  return false
}

interface InquiryBody {
  name?: string
  email?: string
  phone?: string
  message?: string
  product?: string
  quantity?: string
  grade?: string
  website?: string
  [key: string]: unknown
}

export async function POST(request: NextRequest) {
  try {
    const body: InquiryBody = await request.json()

    if (body.website && body.website.trim().length > 0) {
      return NextResponse.json({
        success: true,
        message: 'Thank you! We will get back to you shortly.',
      })
    }

    const name = body.name?.trim()
    const email = body.email?.trim()
    const message = body.message?.trim()

    const errors: string[] = []
    if (!name || name.length < 2)
      errors.push('Name is required (min 2 characters)')
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.push('Valid email is required')
    if (!message || message.length < 10)
      errors.push('Message is required (min 10 characters)')

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 })
    }

    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'unknown'

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { success: false, errors: ['Too many requests. Please try again later.'] },
        { status: 429 },
      )
    }

    const timestamp = new Date().toISOString()

    const fields: [string, string][] = [
      ['Name', name!],
      ['Email', email!],
      ['Phone', body.phone?.trim() || '—'],
      ['Product Interest', body.product?.trim() || '—'],
      ['Quantity', body.quantity?.trim() || '—'],
      ['Grade', body.grade?.trim() || '—'],
      ['Message', message!],
      ['Submitted At', timestamp],
    ]

    const tableRows = fields
      .map(
        ([label, value]) =>
          `<tr><td style="padding:8px 12px;border:1px solid #2D5A3D;font-size:14px;color:#F5EFE0;"><strong>${label}</strong></td><td style="padding:8px 12px;border:1px solid #2D5A3D;font-size:14px;color:#F5EFE0;">${value}</td></tr>`,
      )
      .join('')

    const toEmail = process.env.INQUIRY_TO_EMAIL

    if (resend && toEmail) {
      await resend.emails.send({
        from: 'Golden Deer <contact@cosmicpower.ltd>',
        to: toEmail,
        subject: `New Inquiry from ${name} — Golden Deer Website`,
        html: `<table style="border-collapse:collapse;width:100%;max-width:600px;background:#0F2E1E;font-family:system-ui,sans-serif;">${tableRows}</table>`,
      })

      await resend.emails.send({
        from: 'Golden Deer <contact@cosmicpower.ltd>',
        to: email!,
        subject: 'Thank you for reaching out — Golden Deer',
        html: `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#0F2E1E;font-family:system-ui,sans-serif;">
<div style="max-width:600px;margin:40px auto;background:#0F2E1E;border:2px solid #C89B3C;border-radius:12px;padding:40px;">
<div style="text-align:center;margin-bottom:24px;">
<h1 style="color:#C89B3C;font-size:24px;margin:0;font-weight:700;">Golden Deer</h1>
<p style="color:#A68B5B;font-size:12px;letter-spacing:2px;text-transform:uppercase;margin:4px 0 0;">Premium Roasted Makhana</p>
</div>
<div style="border-top:1px solid #2D5A3D;margin:24px 0;"></div>
<p style="color:#F5EFE0;font-size:16px;line-height:1.6;">Hi ${name},</p>
<p style="color:#F5EFE0;font-size:16px;line-height:1.6;">Thank you for reaching out to Golden Deer. We have received your inquiry and our team will review it shortly.</p>
<p style="color:#F5EFE0;font-size:16px;line-height:1.6;">We typically respond within 24 hours during business days. If your inquiry is urgent, feel free to reach us on WhatsApp.</p>
<div style="text-align:center;margin:32px 0;">
<a href="https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^0-9]/g, '') || '917000000000'}" style="display:inline-block;background:#C89B3C;color:#0F2E1E;text-decoration:none;padding:12px 32px;border-radius:8px;font-weight:600;font-size:14px;">Chat on WhatsApp</a>
</div>
<p style="color:#A68B5B;font-size:14px;line-height:1.6;text-align:center;">— The Golden Deer Team</p>
<div style="border-top:1px solid #2D5A3D;margin:24px 0;"></div>
<p style="color:#5A7A6A;font-size:11px;text-align:center;">Cosmic Power Pvt. Ltd. · CIN U46307BR2026PTC085787</p>
</div></body></html>`,
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! We will get back to you shortly.',
    })
  } catch {
    return NextResponse.json(
      { success: false, errors: ['Invalid request. Please try again.'] },
      { status: 400 },
    )
  }
}
