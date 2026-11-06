import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import AdminActions from '../../AdminActions'
import { ArrowLeft, Package, CreditCard, MapPin, Truck, RotateCcw, History } from 'lucide-react'

export const dynamic = 'force-dynamic'

const STATUS_STYLES: Record<string, string> = {
  PENDING: 'bg-gray-100 text-gray-700',
  PAID: 'bg-green-100 text-green-800',
  SHIPPED: 'bg-blue-100 text-blue-800',
  DELIVERED: 'bg-emerald-100 text-emerald-800',
  RETURNED: 'bg-orange-100 text-orange-800',
  CANCELLED: 'bg-red-100 text-red-700',
  FAILED: 'bg-red-100 text-red-700',
}

function inr(n: number) {
  return `₹${n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

function dt(d: Date | null | undefined) {
  if (!d) return null
  return d.toLocaleString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

function Card({
  title, icon: Icon, children,
}: {
  title: string
  icon: React.ComponentType<{ className?: string }>
  children: React.ReactNode
}) {
  return (
    <section className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
        <Icon className="h-4 w-4" />
        {title}
      </h2>
      {children}
    </section>
  )
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  if (value === null || value === undefined || value === '') return null
  return (
    <div className="flex justify-between gap-4 py-1.5 text-sm">
      <dt className="shrink-0 text-gray-500">{label}</dt>
      <dd className="text-right text-gray-900">{value}</dd>
    </div>
  )
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const [order, auditLog] = await Promise.all([
    prisma.order.findUnique({
      where: { id },
      include: { items: true, returnTicket: true },
    }),
    prisma.adminAuditLog.findMany({
      where: { orderId: id },
      orderBy: { createdAt: 'desc' },
    }),
  ])

  if (!order) notFound()

  // Built from real timestamps only — nothing is inferred or faked.
  const timeline = [
    { label: 'Order placed', at: order.createdAt },
    { label: 'Payment captured', at: order.razorpayPaymentId ? order.updatedAt : null },
    { label: 'Shipped', at: order.shippedAt },
    { label: 'Delivered', at: order.deliveredAt },
  ].filter((t) => t.at)

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <Link
            href="/admin"
            className="mb-2 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            All orders
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="font-mono text-xl text-gray-900">#{order.id.slice(-8)}</h1>
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                STATUS_STYLES[order.status] ?? 'bg-gray-100 text-gray-800'
              }`}
            >
              {order.status}
            </span>
            <Link
              href={`/admin/orders/${order.id}/invoice`}
              target="_blank"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md border border-gray-300 bg-white text-xs font-medium text-gray-700 hover:bg-gray-50 shadow-sm"
            >
              Print Tax Invoice
            </Link>
          </div>
          <p className="mt-1 text-sm text-gray-500">{dt(order.createdAt)}</p>
        </div>

        <AdminActions
          orderId={order.id}
          status={order.status}
          returnStatus={order.returnTicket?.status}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Items + money */}
        <div className="space-y-6 lg:col-span-2">
          <Card title="Items" icon={Package}>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-gray-100">
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2.5">
                      <p className="text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-400">
                        {item.variant} · {inr(item.price)} each · {item.productSlug}
                      </p>
                    </td>
                    <td className="py-2.5 text-center text-gray-500">×{item.quantity}</td>
                    <td className="py-2.5 text-right text-gray-900">
                      {inr(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <dl className="mt-4 border-t border-gray-200 pt-3">
              <Row label="Subtotal" value={inr(order.subtotal)} />
              <Row
                label="Shipping"
                value={order.shippingCharge === 0 ? 'Free' : inr(order.shippingCharge)}
              />
              <div className="mt-2 flex justify-between border-t border-gray-200 pt-2 text-base font-semibold text-gray-900">
                <span>Total charged</span>
                <span>{inr(order.totalAmount)}</span>
              </div>
              <p className="mt-1 text-right text-xs text-gray-400">
                Inclusive of {inr(order.gstAmount)} GST @ {order.gstRate}% ·
                taxable {inr(order.taxableValue)}
              </p>
            </dl>
          </Card>

          {order.returnTicket && (
            <Card title="Return" icon={RotateCcw}>
              <dl>
                <Row label="Status" value={order.returnTicket.status} />
                <Row label="Reason" value={order.returnTicket.reason} />
                <Row
                  label="Reverse AWB"
                  value={
                    order.returnTicket.returnAwb ? (
                      <span className="font-mono text-xs">{order.returnTicket.returnAwb}</span>
                    ) : null
                  }
                />
                <Row
                  label="Refund ID"
                  value={
                    order.returnTicket.refundId ? (
                      <span className="font-mono text-xs">{order.returnTicket.refundId}</span>
                    ) : null
                  }
                />
                <Row label="Raised" value={dt(order.returnTicket.createdAt)} />
              </dl>
            </Card>
          )}

          <Card title="Activity" icon={History}>
            <ol className="space-y-3">
              {timeline.map((t) => (
                <li key={t.label} className="flex justify-between text-sm">
                  <span className="text-gray-900">{t.label}</span>
                  <span className="text-gray-500">{dt(t.at)}</span>
                </li>
              ))}
              {auditLog.map((log) => (
                <li
                  key={log.id}
                  className="flex justify-between border-t border-gray-100 pt-3 text-sm"
                >
                  <span>
                    <span className="font-medium text-gray-900">{log.action}</span>
                    {log.detail && (
                      <span className="block text-xs text-gray-400">{log.detail}</span>
                    )}
                    <span className="block text-xs text-gray-400">by {log.actor}</span>
                  </span>
                  <span className="shrink-0 text-gray-500">{dt(log.createdAt)}</span>
                </li>
              ))}
            </ol>
          </Card>
        </div>

        {/* Customer, address, payment, shipping */}
        <div className="space-y-6">
          <Card title="Customer" icon={MapPin}>
            <dl>
              <Row label="Name" value={order.customerName} />
              <Row
                label="Email"
                value={
                  <a href={`mailto:${order.customerEmail}`} className="text-blue-600 hover:underline">
                    {order.customerEmail}
                  </a>
                }
              />
              <Row
                label="Phone"
                value={
                  <a
                    href={`https://wa.me/91${order.customerPhone}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {order.customerPhone}
                  </a>
                }
              />
            </dl>
            <p className="mt-3 border-t border-gray-100 pt-3 text-sm leading-relaxed text-gray-700">
              {order.shippingAddress}
              <br />
              {order.shippingCity}, {order.shippingState}
              <br />
              {order.shippingPinCode}
            </p>
          </Card>

          <Card title="Payment" icon={CreditCard}>
            <dl>
              <Row
                label="Razorpay order"
                value={<span className="font-mono text-xs">{order.razorpayOrderId ?? '—'}</span>}
              />
              <Row
                label="Payment ID"
                value={<span className="font-mono text-xs">{order.razorpayPaymentId ?? '—'}</span>}
              />
              <Row label="Currency" value={order.currency} />
            </dl>
          </Card>

          <Card title="Shipping" icon={Truck}>
            <dl>
              <Row
                label="AWB / Courier"
                value={
                  order.awbNumber ? (
                    <span className="font-mono text-xs">
                      {order.awbNumber}
                    </span>
                  ) : (
                    '—'
                  )
                }
              />
              <Row label="Shipped" value={dt(order.shippedAt)} />
              <Row label="Delivered" value={dt(order.deliveredAt)} />
            </dl>
            {order.awbNumber?.startsWith('MOCK-') && (
              <p className="mt-3 rounded-md bg-amber-50 px-2.5 py-2 text-xs text-amber-800">
                This is a mock AWB — Delhivery is not configured, so no real shipment exists.
              </p>
            )}
          </Card>

          {order.adminNote && (
            <Card title="Internal Staff Note" icon={Package}>
              <p className="text-xs text-gray-700 bg-amber-50/60 p-3 rounded-md border border-amber-200">
                {order.adminNote}
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
