import { products } from './products'

const pairings: Record<string, string> = {
  'makhana-bhel': 'plain',
  'makhana-kheer': 'raw-makhana',
  'peri-peri-makhana': 'peri-peri',
  'makhana-chaat': 'plain',
  'golden-trail-mix': 'salted',
  'makhana-curry': 'raw-makhana',
}

export function getRecipePairing(slug: string) {
  return products.find((product) => product.slug === pairings[slug]) || products[0]
}
