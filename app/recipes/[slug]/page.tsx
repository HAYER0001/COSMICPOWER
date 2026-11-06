import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { recipes } from '@/content/recipes'
import { getRecipePairing } from '@/content/recipe-pairings'
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
  if (!recipe) notFound()

  const title = `${recipe.title} — Golden Deer`
  const description = recipe.intro.slice(0, 160)
  const posterUrl = `${BASE_URL}${getRecipePairing(recipe.slug).poster}`

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

  if (!recipe) notFound()

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
        image: `${BASE_URL}${getRecipePairing(recipe.slug).poster}`,
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
