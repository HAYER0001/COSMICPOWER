/**
 * Delhivery integration.
 *
 * Set DELHIVERY_API_KEY and DELHIVERY_PICKUP_NAME to go live. Until both are
 * present the module runs in MOCK mode: it returns clearly-fake AWBs prefixed
 * `MOCK-` so a test shipment can never be mistaken for a real one.
 *
 * Toggle staging with DELHIVERY_ENV=staging.
 */

const API_KEY = process.env.DELHIVERY_API_KEY
/** Registered pickup location name, exactly as it appears in the Delhivery panel. */
const PICKUP_NAME = process.env.DELHIVERY_PICKUP_NAME

const BASE_URL =
  process.env.DELHIVERY_ENV === 'staging'
    ? 'https://staging-express.delhivery.com'
    : 'https://track.delhivery.com'

export const isMockMode = !API_KEY || !PICKUP_NAME

function authHeaders() {
  return {
    Authorization: `Token ${API_KEY}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  }
}

export interface ShipmentInput {
  id: string
  customerName: string
  customerPhone: string
  shippingAddress: string
  shippingCity: string
  shippingState: string
  shippingPinCode: string
  totalAmount: number
}

/** True when Delhivery delivers to this PIN code. Fails open on API errors. */
export async function checkPincodeServiceability(pincode: string): Promise<boolean> {
  if (isMockMode) {
    // Mock: everything is serviceable except 999xxx, so the unhappy path is testable.
    return !pincode.startsWith('999')
  }

  try {
    const res = await fetch(
      `${BASE_URL}/c/api/pin-codes/json/?filter_codes=${encodeURIComponent(pincode)}`,
      { headers: authHeaders(), cache: 'no-store' }
    )
    if (!res.ok) throw new Error(`Delhivery responded ${res.status}`)

    const data = await res.json()
    const postalCodes = data?.delivery_codes ?? []
    return postalCodes.length > 0
  } catch (error) {
    // Do not block a sale because the courier API blipped. The admin will catch
    // an undeliverable address when generating the label.
    console.error('[delhivery] serviceability check failed, allowing order:', error)
    return true
  }
}

/** Create a forward shipment and return its AWB (tracking number). */
export async function generateForwardAWB(order: ShipmentInput): Promise<string> {
  if (isMockMode) {
    console.warn('[delhivery] MOCK mode — returning a fake AWB. Set DELHIVERY_API_KEY to go live.')
    return `MOCK-${Date.now()}`
  }

  const payload = {
    shipments: [
      {
        name: order.customerName,
        add: order.shippingAddress,
        city: order.shippingCity,
        state: order.shippingState,
        pin: order.shippingPinCode,
        phone: order.customerPhone,
        order: order.id,
        payment_mode: 'Prepaid',
        total_amount: order.totalAmount,
        country: 'India',
      },
    ],
    pickup_location: { name: PICKUP_NAME },
  }

  const res = await fetch(`${BASE_URL}/api/cmu/create.json`, {
    method: 'POST',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `format=json&data=${encodeURIComponent(JSON.stringify(payload))}`,
  })

  const data = await res.json().catch(() => null)
  const packages = data?.packages ?? []
  const waybill = packages[0]?.waybill

  if (!res.ok || !waybill) {
    const remark = packages[0]?.remarks?.join?.('; ') || data?.rmk || `HTTP ${res.status}`
    throw new Error(`Delhivery rejected the shipment: ${remark}`)
  }

  return waybill as string
}

/** Raise a reverse pickup and return its AWB. */
export async function createReversePickup(
  order: ShipmentInput,
  reason: string
): Promise<string> {
  if (isMockMode) {
    console.warn('[delhivery] MOCK mode — returning a fake return AWB.')
    return `MOCK-RET-${Date.now()}`
  }

  const payload = {
    shipments: [
      {
        name: order.customerName,
        add: order.shippingAddress,
        city: order.shippingCity,
        state: order.shippingState,
        pin: order.shippingPinCode,
        phone: order.customerPhone,
        order: `RET-${order.id}`,
        payment_mode: 'Pickup',
        total_amount: order.totalAmount,
        country: 'India',
        return_reason: reason,
      },
    ],
    pickup_location: { name: PICKUP_NAME },
  }

  const res = await fetch(`${BASE_URL}/api/cmu/create.json`, {
    method: 'POST',
    headers: {
      ...authHeaders(),
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `format=json&data=${encodeURIComponent(JSON.stringify(payload))}`,
  })

  const data = await res.json().catch(() => null)
  const waybill = data?.packages?.[0]?.waybill

  if (!res.ok || !waybill) {
    throw new Error(`Delhivery rejected the return: ${data?.rmk ?? `HTTP ${res.status}`}`)
  }

  return waybill as string
}
