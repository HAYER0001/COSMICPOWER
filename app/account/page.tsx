import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Container } from '@/components/shared/primitives'
import AccountSignOutButton from './AccountSignOutButton'
import {
  Package,
  Truck,
  ExternalLink,
  ShoppingBag,
  Calendar,
  CheckCircle,
  Clock,
  Printer,
  ChevronRight,
} from 'lucide-react'

export const dynamic = 'force-dynamic'

const STATUS_BADGES: Record<string, { bg: string; text: string; icon: typeof CheckCircle }> = {
  PAID: { bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-800', icon: CheckCircle },
  SHIPPED: { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-800', icon: Truck },
  DELIVERED: { bg: 'bg-teal-50 border-teal-200', text: 'text-teal-800', icon: CheckCircle },
  PENDING: { bg: 'bg-amber-50 border-amber-200', text: 'text-amber-800', icon: Clock },
  CANCELLED: { bg: 'bg-rose-50 border-rose-200', text: 'text-rose-800', icon: Clock },
}

function resolveCarrierTracking(awb: string | null) {
  if (!awb || awb.startsWith('MOCK-')) return { name: 'Website Tracker', url: '/track' }
  if (awb.startsWith('AMZN')) return { name: 'Amazon Shipping', url: 'https://track.amazon.in/' }
  if (awb.startsWith('SR') || awb.length === 12 || awb.length === 14) {
    return { name: 'Shiprocket', url: `https://shiprocket.co/tracking/${awb}` }
  }
  return { name: 'Delhivery', url: `https://www.delhivery.com/track/package/${awb}` }
}

export default async function AccountPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    redirect('/account/login')
  }

  const email = session.user.email.toLowerCase()

  // Fetch all orders associated with this customer's email or user id
  const orders = await prisma.order.findMany({
    where: {
      OR: [{ customerEmail: email }, { userId: session.user.id }],
    },
    orderBy: { createdAt: 'desc' },
    include: { items: true, returnTicket: true },
  })

  return (
    <div className="py-12 sm:py-20 bg-cream min-h-screen">
      <Container className="max-w-4xl mx-auto">
        {/* Customer Header */}
        <div className="rounded-2xl border border-forest/15 bg-white p-6 sm:p-8 shadow-sm mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-gold-deep">
              Customer Account
            </span>
            <h1 className="font-display text-2xl sm:text-3xl text-forest-deep mt-0.5">
              Welcome, {session.user.name || email.split('@')[0]}
            </h1>
            <p className="text-xs sm:text-sm text-forest-deep/60 mt-1">
              Logged in as <span className="font-mono">{email}</span>
            </p>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {session.user.role === 'ADMIN' && (
              <Link
                href="/admin"
                className="px-3 py-2 rounded-lg text-xs font-semibold bg-forest-deep text-gold hover:bg-black transition-colors"
              >
                Go to Admin Portal &rarr;
              </Link>
            )}
            <AccountSignOutButton />
          </div>
        </div>

        {/* Orders Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-xl sm:text-2xl text-forest-deep flex items-center gap-2">
                <Package className="h-5 w-5 text-gold-deep" />
                My Orders &amp; Delivery Tracking
              </h2>
              <p className="text-xs text-forest-deep/60 mt-0.5">
                Track your active shipments in real time from our Masaurhi facility
              </p>
            </div>
            <Link
              href="/products"
              className="text-xs font-semibold text-gold-deep hover:underline inline-flex items-center gap-1"
            >
              Browse Products <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="rounded-2xl border border-forest/10 bg-white p-12 text-center space-y-4 shadow-sm">
              <ShoppingBag className="h-12 w-12 text-forest-deep/20 mx-auto" />
              <h3 className="font-display text-lg text-forest-deep">No Orders Yet</h3>
              <p className="text-xs sm:text-sm text-forest-deep/60 max-w-sm mx-auto">
                You haven&apos;t placed any orders with this email yet. Explore our 5 signature slow-roasted flavours!
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gold text-forest-deep font-semibold text-xs shadow-sm hover:bg-gold-deep transition-colors"
              >
                Start Shopping &rarr;
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => {
                const badge = STATUS_BADGES[order.status] || STATUS_BADGES.PENDING
                const carrier = resolveCarrierTracking(order.awbNumber)
                const isShipped = order.status === 'SHIPPED' || order.status === 'DELIVERED'

                return (
                  <div
                    key={order.id}
                    className="rounded-2xl border border-forest/15 bg-white p-6 shadow-sm hover:border-gold/30 transition-all space-y-4"
                  >
                    {/* Top Row: Ref, Date, Badge */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-forest/10">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-bold text-forest-deep">
                          Order #{order.id.slice(-8)}
                        </span>
                        <span className="text-xs text-forest-deep/50 flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(order.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${badge.bg} ${badge.text}`}
                      >
                        <badge.icon className="h-3.5 w-3.5" />
                        {order.status}
                      </span>
                    </div>

                    {/* Middle: Items List */}
                    <div className="space-y-2">
                      <ul className="divide-y divide-forest/5">
                        {order.items.map((item) => (
                          <li
                            key={item.id}
                            className="py-2 flex items-center justify-between text-xs sm:text-sm"
                          >
                            <div>
                              <strong className="text-forest-deep">{item.name}</strong>
                              <span className="text-forest-deep/60 ml-2">({item.variant})</span>
                            </div>
                            <span className="font-medium text-forest-deep">
                              {item.quantity} &times; ₹{item.price}
                            </span>
                          </li>
                        ))}
                      </ul>
                      <div className="pt-2 flex justify-between items-baseline text-xs text-forest-deep/70">
                        <span>
                          Delivery to: <strong>{order.shippingCity}, {order.shippingState} ({order.shippingPinCode})</strong>
                        </span>
                        <span className="text-sm font-bold text-forest-deep">
                          Total Paid: ₹{order.totalAmount.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Bottom Action Bar: Courier Tracking + Invoice */}
                    <div className="pt-3 border-t border-forest/10 flex flex-wrap items-center justify-between gap-3">
                      <div>
                        {order.awbNumber ? (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-forest-deep/60">Tracking AWB:</span>
                            <span className="font-mono text-xs font-bold text-forest-deep">
                              {order.awbNumber}
                            </span>
                          </div>
                        ) : (
                          <p className="text-xs text-forest-deep/50 italic">
                            Order confirmed &bull; Preparing for dispatch
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Link
                          href={`/track?ref=${order.id.slice(-8)}&email=${encodeURIComponent(order.customerEmail)}`}
                          className="inline-flex items-center gap-1 text-xs px-3 py-1.5 rounded-md border border-forest/20 text-forest-deep hover:bg-forest/5 transition-colors font-medium"
                        >
                          <Clock className="h-3.5 w-3.5" />
                          Timeline
                        </Link>

                        {isShipped && (
                          <a
                            href={carrier.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs px-3.5 py-1.5 rounded-md bg-gold hover:bg-gold-deep text-forest-deep font-semibold shadow-sm transition-colors"
                          >
                            <Truck className="h-3.5 w-3.5" />
                            Track on {carrier.name}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
