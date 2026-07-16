import Link from 'next/link'
import type { Metadata } from 'next'
import { recipes } from '@/content/recipes'
import { Container } from '@/components/shared/primitives'
import MotionLoop from '@/components/shared/MotionLoop'
import { ChevronRight } from 'lucide-react'

const BASE_URL = 'https://www.cosmicpower.ltd'

export const metadata: Metadata = {
  title: 'Recipes — Golden Deer',
  description:
    'Delicious and healthy makhana recipes from Golden Deer — from classic chaat to creamy kheer, peri-peri to rich curry. Clean eating, bold flavours.',
  openGraph: {
    title: 'Recipes — Golden Deer',
    description:
      'Delicious and healthy makhana recipes from Golden Deer — from classic chaat to creamy kheer, peri-peri to rich curry. Clean eating, bold flavours.',
    url: `${BASE_URL}/recipes`,
    images: [
      {
        url: `${BASE_URL}/images/og/og-recipes.jpg`,
        width: 1200,
        height: 630,
        alt: 'Golden Deer Recipes',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recipes — Golden Deer',
    description: 'Delicious and healthy makhana recipes from Golden Deer.',
    images: [`${BASE_URL}/images/og/og-recipes.jpg`],
  },
  alternates: { canonical: `${BASE_URL}/recipes` },
}

export default function RecipesPage() {
  return (
    <Container className="py-8 sm:py-12">
      <nav
        className="flex items-center gap-1.5 text-xs sm:text-sm text-forest-deep/50 mb-8 flex-wrap"
        aria-label="Breadcrumb"
      >
        <Link href="/" className="hover:text-gold transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3" />
        <span className="text-forest-deep/80">Recipes</span>
      </nav>

      <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight text-forest-deep mb-3">
        Makhana Recipes
      </h1>
      <p className="text-base sm:text-lg text-forest-deep/60 leading-relaxed max-w-2xl mb-10">
        From street-food chaat to royal kheer — explore delicious ways to enjoy
        Golden Deer makhana.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {recipes.map((recipe) => (
          <Link
            key={recipe.slug}
            href={`/recipes/${recipe.slug}`}
            className="group block"
          >
            <div className="relative rounded-xl overflow-hidden border border-white/5 group-hover:border-gold/30 transition-all">
              <MotionLoop
                src={recipe.loop}
                poster={recipe.poster}
                aspect="4/3"
                alt={`${recipe.title} — Golden Deer`}
              />
            </div>
            <div className="mt-3 space-y-1.5">
              <h3 className="font-display text-lg text-forest-deep group-hover:text-gold transition-colors leading-tight">
                {recipe.title}
              </h3>
              <div className="flex items-center gap-3 text-xs text-forest-deep/50">
                <span>{recipe.time}</span>
                <span aria-hidden="true">·</span>
                <span>Serves {recipe.serves}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  )
}
