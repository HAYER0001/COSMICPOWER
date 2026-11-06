import Razorpay from 'razorpay'

/**
 * Lazily-constructed Razorpay client.
 *
 * The SDK constructor throws when `key_id` is absent, so building it at module
 * scope would break `next build` on any machine without the secrets. Construct
 * it on first use instead, and fail with a message that says what to fix.
 */

let client: Razorpay | null = null

export const isRazorpayConfigured = Boolean(
  process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET
)

function getClient(): Razorpay {
  if (client) return client

  const key_id = process.env.RAZORPAY_KEY_ID
  const key_secret = process.env.RAZORPAY_KEY_SECRET

  if (!key_id || !key_secret) {
    throw new Error(
      'Payments are not configured — set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.'
    )
  }

  client = new Razorpay({ key_id, key_secret })
  return client
}

/**
 * Proxy so callers can keep writing `razorpay.orders.create(...)` while the
 * real client is still built on demand.
 */
export const razorpay = new Proxy({} as Razorpay, {
  get(_target, prop: string | symbol) {
    return Reflect.get(getClient() as object, prop)
  },
})
