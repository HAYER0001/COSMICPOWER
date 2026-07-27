import Link from 'next/link'
import type { Metadata } from 'next'
import { recipes } from '@/content/recipes'
import RecipeDetailClient from '@/components/recipes/RecipeDetailClient'

const BASE_URL = 'https://www.cosmicpower.ltd'

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const recipe = recipes.find((r) => r.slug === slug)
  if (!recipe) return { title: 'Recipe not found — Golden Deer' }

  const title = `${recipe.title} — Golden Deer`
  const description = recipe.intro.slice(0, 160)
  const posterUrl = `${BASE_URL}${recipe.poster}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        { url: posterUrl, width: 1200, height: 900, alt: recipe.title },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [posterUrl],
    },
    alternates: {
      canonical: `${BASE_URL}/recipes/${slug}`,
    },
  }
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const recipe = recipes.find((r) => r.slug === slug)

  if (!recipe) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl text-forest-deep">Recipe not found</h1>
        <Link
          href="/recipes"
          className="mt-6 inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide border border-gold text-gold hover:bg-gold hover:text-forest-deep transition-all rounded-lg"
        >
          Back to Recipes
        </Link>
      </div>
    )
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Recipe',
        name: recipe.title,
        description: recipe.intro,
        author: { '@type': 'Organization', name: 'Golden Deer' },
        datePublished: '2026-01-01',
        prepTime: `PT${recipe.time.match(/\d+/)?.[0] || '10'}M`,
        totalTime: `PT${recipe.time.match(/\d+/)?.[0] || '10'}M`,
        recipeYield: recipe.serves,
        recipeIngredient: recipe.ingredients,
        recipeInstructions: recipe.steps.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          text: s,
        })),
        image: `${BASE_URL}${recipe.poster}`,
        publisher: {
          '@type': 'Organization',
          name: 'Golden Deer',
          url: BASE_URL,
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Recipes',
            item: `${BASE_URL}/recipes`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: recipe.title,
            item: `${BASE_URL}/recipes/${recipe.slug}`,
          },
        ],
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <RecipeDetailClient recipe={recipe} />
    </>
  )
}
