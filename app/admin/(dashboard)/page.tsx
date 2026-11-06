import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { OrderStatus, type Prisma } from '@prisma/client'
import AdminOrdersTable from './AdminOrdersTable'
import { IndianRupee, Package, Truck, RotateCcw, TrendingUp, Download } from 'lucide-react'

export const dynamic = 'force-dynamic'

const STATUS_TABS: { label: string; value: string }[] = [
  { label: 'All Orders', value: 'all' },
  { label: 'Awaiting Payment', value: OrderStatus.PENDING },
  { label: 'Paid (To Ship)', value: OrderStatus.PAID },
  { label: 'In Transit', value: OrderStatus.SHIPPED },
  { label: 'Delivered', value: OrderStatus.DELIVERED },
  { label: 'Returns', value: OrderStatus.RETURNED },
]

function inr(n: number) {
  return `₹${n.toLocaleString('en-IN')}`
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>
}) {
  const { status = 'all', q = '' } = await searchParams
  const query = q.trim()

  const where: Prisma.OrderWhereInput = {}
  if (status !== 'all' && status in OrderStatus) {
    where.status = status as OrderStatus
  }
  if (query) {
    where.OR = [
      { id: { contains: query, mode: 'insensitive' } },
      { customerEmail: { contains: query, mode: 'insensitive' } },
      { customerName: { contains: query, mode: 'insensitive' } },
      { customerPhone: { contains: query } },
      { awbNumber: { contains: query, mode: 'insensitive' } },
      { shippingCity: { contains: query, mode: 'insensitive' } },
      { shippingPinCode: { contains: query } },
    ]
  }

  const startOfToday = new Date()
  startOfToday.setHours(0, 0, 0, 0)

  const [orders, revenue, ordersToday, awaitingShipment, inTransit, openReturns, paidCount] =
    await Promise.all([
      prisma.order.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: 100,
        include: { returnTicket: true, items: true },
      }),
      // Revenue counts only money actually collected.
      prisma.order.aggregate({
        _sum: { totalAmount: true },
        where: {
          status: { in: [OrderStatus.PAID, OrderStatus.SHIPPED, OrderStatus.DELIVERED] },
        },
      }),
      prisma.order.count({ where: { createdAt: { gte: startOfToday } } }),
      prisma.order.count({ where: { status: OrderStatus.PAID } }),
      prisma.order.count({ where: { status: OrderStatus.SHIPPED } }),
      prisma.returnTicket.count({ where: { status: { not: 'REFUNDED' } } }),
      prisma.order.count({
        where: {
          status: { in: [OrderStatus.PAID, OrderStatus.SHIPPED, OrderStatus.DELIVERED] },
        },
      }),
    ])

  const totalRev = revenue._sum.totalAmount ?? 0
  const aov = paidCount > 0 ? inr(Math.round(totalRev / paidCount)) : '₹0'

  const stats = [
    { label: 'Gross Revenue', value: inr(totalRev), icon: IndianRupee },
    { label: 'Avg Order Value (AOV)', value: aov, icon: TrendingUp },
    { label: 'Orders Today', value: String(ordersToday), icon: Package },
    { label: 'Awaiting Shipment', value: String(awaitingShipment), icon: Package },
    { label: 'In Transit', value: String(inTransit), icon: Truck },
    { label: 'Open Returns', value: String(openReturns), icon: RotateCcw },
  ]

  // Serialize dates for client table component
  const serializedOrders = orders.map((o) => ({
    ...o,
    createdAt: o.createdAt.toISOString(),
    returnTicket: o.returnTicket
      ? { id: o.returnTicket.id, status: o.returnTicket.status }
      : null,
  }))

  return (
    <div className="space-y-6">
      {/* Real-time Pulse Metrics (Feature #21) */}
      <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-6">
        {stats.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:border-[#C9A24B]/40 transition-colors"
          >
            <div className="flex items-center gap-1.5 text-gray-500">
              <Icon className="h-4 w-4 text-[#0F2E1E]" />
              <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-600 truncate">
                {label}
              </p>
            </div>
            <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
          </div>
        ))}
      </div>

      {/* Filter Tabs & Universal Search Bar (Feature #1) */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white p-3.5 shadow-sm">
        <nav className="flex flex-wrap gap-1.5">
          {STATUS_TABS.map((tab) => {
            const active = status === tab.value
            const params = new URLSearchParams()
            if (tab.value !== 'all') params.set('status', tab.value)
            if (query) params.set('q', query)
            const href = params.toString() ? `/admin?${params}` : '/admin'
            return (
              <Link
                key={tab.value}
                href={href}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                  active
                    ? 'bg-[#0F2E1E] text-[#E8C97A] shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <form method="GET" action="/admin" className="flex-1 sm:flex-initial flex gap-2">
            {status !== 'all' && <input type="hidden" name="status" value={status} />}
            <div className="relative flex-1 sm:w-72">
              <input
                name="q"
                defaultValue={query}
                placeholder="Search orders, phone, PIN, AWB..."
                className="w-full rounded-lg border border-gray-300 pl-3 pr-14 py-1.5 text-xs outline-none focus:border-[#C9A24B] focus:ring-1 focus:ring-[#C9A24B]"
              />
              <span className="absolute right-2 top-1.5 text-[10px] font-mono text-gray-400 border border-gray-200 bg-gray-50 px-1 rounded">
                ⌘K
              </span>
            </div>
            <button
              type="submit"
              className="rounded-lg bg-gray-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-gray-800 transition-colors"
            >
              Search
            </button>
          </form>

          <a
            href="/api/admin/export"
            download
            className="hidden md:inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition-colors"
            title="Download GST & Financial CSV Report"
          >
            <Download className="h-3.5 w-3.5 text-gray-500" />
            Export CSV
          </a>
        </div>
      </div>

      {/* Interactive Orders Table with Multi-Select, Bulk Actions & Slide-Over Drawer */}
      <AdminOrdersTable orders={serializedOrders} />

      {orders.length === 100 && (
        <p className="text-center text-xs text-gray-400">
          Showing the 100 most recent orders. Use search or status filters to locate specific orders.
        </p>
      )}
    </div>
  )
}
