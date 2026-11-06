import type { Product } from '@/content/products'

export const marketplaceNames = {
  blinkit: 'Blinkit',
  zepto: 'Zepto',
  instamart: 'Swiggy Instamart',
  amazon: 'Amazon',
  flipkart: 'Flipkart',
  indiamart: 'IndiaMART',
} as const

const marketplaceHosts: Record<keyof typeof marketplaceNames, string[]> = {
  blinkit: ['blinkit.com'],
  zepto: ['zepto.com', 'zeptonow.com'],
  instamart: ['swiggy.com'],
  amazon: ['amazon.in', 'amzn.in', 'amzn.to'],
  flipkart: ['flipkart.com', 'dl.flipkart.com'],
  indiamart: ['indiamart.com'],
}

/** Only publish explicit product destinations from the matching marketplace. */
export function getMarketplaceLinks(commerce: Product['commerce']) {
  return (Object.keys(marketplaceNames) as (keyof typeof marketplaceNames)[]).flatMap((key) => {
    try {
      const href = commerce[key]
      if (!href) return []
      const url = new URL(href)
      if (url.protocol !== 'https:' || url.username || url.password) return []
      if (!marketplaceHosts[key].some((host) => url.hostname === host || url.hostname.endsWith(`.${host}`))) return []
      return [{ key, label: marketplaceNames[key], href }]
    } catch { return [] }
  })
}
