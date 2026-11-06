import { products } from '@/content/products'

/**
 * Server-authoritative pricing.
 *
 * SECURITY: the cart lives in localStorage (`golden-deer-cart`), so every value
 * that reaches the server from it is attacker-controlled. Nothing here may ever
 * read a price off the request — prices are re-derived from content/products.ts
 * by (slug, variant). See priceCart().
 */

/** Free shipping at or above this order subtotal, in rupees. */
export const FREE_SHIPPING_THRESHOLD = 999
/** Flat shipping charge below the threshold, in rupees. */
export const SHIPPING_FLAT_RATE = 49
/** Allow bulk orders up to 200 packs per line item. */
export const MAX_QUANTITY_PER_LINE = 200

/**
 * GST rate applied to makhana, as a percentage.
 *
 * Prices in content/products.ts are GST-INCLUSIVE — the customer is charged the
 * listed price and nothing is added at checkout. This rate exists only to
 * back-calculate the tax component for the order record, because a business
 * filing under GSTIN 10AANCC9477F2ZG needs the split even when the customer
 * never sees it.
 *
 * Default 5% (HSN 2106 — namkeen). CONFIRM WITH YOUR CA before invoicing, and
 * override with GST_RATE_PERCENT if it differs.
 */
export const GST_RATE_PERCENT = Number(process.env.GST_RATE_PERCENT ?? 5)

/** Split a GST-inclusive amount into its base and tax components. */
export function splitInclusiveGst(inclusiveAmount: number): {
  taxable: number
  gst: number
} {
  const taxable = inclusiveAmount / (1 + GST_RATE_PERCENT / 100)
  return {
    taxable: Math.round(taxable * 100) / 100,
    gst: Math.round((inclusiveAmount - taxable) * 100) / 100,
  }
}

export interface CartLineInput {
  productSlug: string
  variant: string
  quantity: number
}

export interface PricedLine {
  productSlug: string
  name: string
  variant: string
  /** Unit price resolved on the server. */
  price: number
  quantity: number
  lineTotal: number
}

export interface PricedCart {
  lines: PricedLine[]
  subtotal: number
  shipping: number
  total: number
  /** Taxable value of `total`, excluding GST. For records, not for display. */
  taxableValue: number
  /** GST already contained within `total`. Never added on top. */
  gstAmount: number
  gstRate: number
}

export class PricingError extends Error {}

/** Resolve a single (slug, variant) pair to its canonical unit price. */
export function resolveUnitPrice(productSlug: string, variant: string): {
  name: string
  price: number
} {
  const product = products.find((p) => p.slug === productSlug)
  if (!product) {
    throw new PricingError(`Unknown product: ${productSlug}`)
  }
  if (!product.variants || product.variants.length === 0) {
    throw new PricingError(`${product.name} is bulk inquiry only and has no retail variants`)
  }

  const match = product.variants.find((v) => v.weight === variant)
  if (!match) {
    throw new PricingError(`Unknown variant "${variant}" for ${product.name}`)
  }

  return { name: product.name, price: match.price }
}

/**
 * Re-price an entire cart from scratch.
 *
 * The caller passes only slug / variant / quantity. Any price, name or total the
 * client may have sent is discarded. Returns the amount that is safe to charge.
 */
export function priceCart(lines: CartLineInput[]): PricedCart {
  if (!Array.isArray(lines) || lines.length === 0) {
    throw new PricingError('Cart is empty')
  }

  const priced: PricedLine[] = lines.map((line) => {
    const quantity = Number(line.quantity)
    if (!Number.isInteger(quantity) || quantity < 1) {
      throw new PricingError('Quantity must be a whole number of at least 1')
    }
    if (quantity > MAX_QUANTITY_PER_LINE) {
      throw new PricingError(
        `Maximum ${MAX_QUANTITY_PER_LINE} units per item — contact us for bulk orders`
      )
    }

    const { name, price } = resolveUnitPrice(line.productSlug, line.variant)

    return {
      productSlug: line.productSlug,
      name,
      variant: line.variant,
      price,
      quantity,
      lineTotal: price * quantity,
    }
  })

  const subtotal = priced.reduce((sum, l) => sum + l.lineTotal, 0)
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT_RATE
  const total = subtotal + shipping

  // GST is inside `total`, never added to it.
  const { taxable, gst } = splitInclusiveGst(total)

  return {
    lines: priced,
    subtotal,
    shipping,
    total,
    taxableValue: taxable,
    gstAmount: gst,
    gstRate: GST_RATE_PERCENT,
  }
}

/** Convert a rupee amount to the integer paise Razorpay expects. */
export function toPaise(rupees: number): number {
  return Math.round(rupees * 100)
}
