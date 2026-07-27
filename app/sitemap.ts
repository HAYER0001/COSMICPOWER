import type { MetadataRoute } from 'next'
import { products } from '@/content/products'
import { recipes } from '@/content/recipes'
import { journal } from '@/content/journal'
import { glossary } from '@/content/glossary'
import { comparisons } from '@/content/comparisons'

const BASE_URL = 'https://www.cosmicpower.ltd'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/products`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/recipes`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/our-story`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/bulk`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE_URL}/journal`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/privacy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/terms`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/shipping`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/brand`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/makhana`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${BASE_URL}/makhana/glossary`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/makhana/vs`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/makhana/nutrition`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/editorial-policy`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ]

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const glossaryRoutes: MetadataRoute.Sitemap = glossary.map((g) => ({
    url: `${BASE_URL}/makhana/glossary/${g.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.5,
  }))

  const recipeRoutes: MetadataRoute.Sitemap = recipes.map((r) => ({
    url: `${BASE_URL}/recipes/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  const journalRoutes: MetadataRoute.Sitemap = journal.map((j) => ({
    url: `${BASE_URL}/journal/${j.slug}`,
    lastModified: new Date(j.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const comparisonRoutes: MetadataRoute.Sitemap = comparisons.map((c) => ({
    url: `${BASE_URL}/makhana/vs/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const hindiRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/hi/makhana-kya-hai`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/hi/makhana-konsa-lu`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  return [...staticRoutes, ...productRoutes, ...recipeRoutes, ...journalRoutes, ...glossaryRoutes, ...comparisonRoutes, ...hindiRoutes]
}
