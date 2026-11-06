import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions, isAdmin } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

/**
 * Guard an admin API route.
 *
 * Returns the admin's email on success, or a 403 NextResponse to return as-is.
 * getServerSession MUST receive authOptions — without it the `role` callback
 * never runs and every caller looks like a non-admin.
 */
export async function requireAdmin(): Promise<
  { ok: true; actor: string } | { ok: false; response: NextResponse }
> {
  const session = await getServerSession(authOptions)

  if (!isAdmin(session)) {
    return {
      ok: false,
      response: NextResponse.json({ error: 'Unauthorized' }, { status: 403 }),
    }
  }

  return { ok: true, actor: session?.user?.email ?? 'admin' }
}

/** Record an admin action so refunds and shipments are attributable. */
export async function audit(
  actor: string,
  action: string,
  orderId?: string,
  detail?: string
) {
  try {
    await prisma.adminAuditLog.create({ data: { actor, action, orderId, detail } })
  } catch (error) {
    console.error('[audit] failed to write log entry:', error)
  }
}
