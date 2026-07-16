'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { Recipe } from '@/content/recipes'
import { recipes } from '@/content/recipes'
import { site } from '@/content/site'
import MotionLoop from '@/components/shared/MotionLoop'
import {
  Container,
  Divider,
  Button,
} from '@/components/shared/primitives'
import YouTubeEmbed from '@/components/recipes/YouTubeEmbed'
import {
  ChevronRight,
  Clock,
  Users,
  Check,
  Link as LinkIcon,
  MessageCircle,
  ArrowRight,
} from 'lucide-react'

function Breadcrumb({ recipe }: { recipe: Recipe }) {
  return (
    <nav
      className="flex items-center gap-1.5 text-xs sm:text-sm text-forest-deep/50 mb-6 flex-wrap"
      aria-label="Breadcrumb"
    >
      <Link href="/" className="hover:text-gold transition-colors">
        Home
      </Link>
      <ChevronRight className="w-3 h-3" />
      <Link href="/recipes" className="hover:text-gold transition-colors">
        Recipes
      </Link>
      <ChevronRight className="w-3 h-3" />
      <span className="text-forest-deep/80 truncate max-w-[250px]">
        {recipe.title}
      </span>
    </nav>
  )
}

export default function RecipeDetailClient({ recipe }: { recipe: Recipe }) {
  const [checked, setChecked] = useState<string[]>([])
  const [copied, setCopied] = useState(false)

  function toggleIngredient(item: string) {
    setChecked((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    )
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // fallback
    }
  }

  const related = recipes.filter((r) => r.slug !== recipe.slug).slice(0, 3)

  return (
    <Container className="py-8 sm:py-12 pb-24 sm:pb-16">
      <Breadcrumb recipe={recipe} />

      {/* Cinemagraph Hero */}
      <div className="relative rounded-2xl overflow-hidden border border-white/5 mb-8">
        <MotionLoop
          src={recipe.loop}
          poster={recipe.poster}
          aspect="16/9"
          alt={`${recipe.title} — Golden Deer recipe`}
          priority
        />
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight text-forest-deep">
            {recipe.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 mt-4">
            <span className="flex items-center gap-1.5 text-sm text-forest-deep/60">
              <Clock className="w-4 h-4 text-gold" />
              {recipe.time}
            </span>
            <span className="flex items-center gap-1.5 text-sm text-forest-deep/60">
              <Users className="w-4 h-4 text-gold" />
              Serves {recipe.serves}
            </span>
          </div>
        </div>

        <Divider />

        {/* Intro */}
        <p className="text-base sm:text-lg text-forest-deep/70 leading-relaxed">
          {recipe.intro}
        </p>

        <Divider />

        {/* YouTube Video */}
        <YouTubeEmbed youtubeId={recipe.youtubeId} title={recipe.title} />

        <Divider />

        {/* Ingredients */}
        <div>
          <h2 className="font-display text-2xl text-forest-deep mb-4">
            Ingredients
          </h2>
          <ul className="space-y-2">
            {recipe.ingredients.map((item) => {
              const isChecked = checked.includes(item)
              return (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => toggleIngredient(item)}
                    className="flex items-start gap-3 w-full text-left group"
                  >
                    <span
                      className={`mt-0.5 w-5 h-5 shrink-0 rounded border-2 flex items-center justify-center transition-all ${
                        isChecked
                          ? 'bg-gold border-gold text-forest-deep'
                          : 'border-cream/30 group-hover:border-gold/50'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </span>
                    <span
                      className={`text-sm sm:text-base leading-relaxed ${
                        isChecked
                          ? 'text-forest-deep/40 line-through'
                          : 'text-forest-deep/80'
                      }`}
                    >
                      {item}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>

        <Divider />

        {/* Steps */}
        <div>
          <h2 className="font-display text-2xl text-forest-deep mb-4">Method</h2>
          <ol className="space-y-6">
            {recipe.steps.map((step, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex items-center justify-center w-8 h-8 shrink-0 rounded-full bg-gold/15 text-gold text-sm font-semibold font-mono">
                  {i + 1}
                </span>
                <p className="text-sm sm:text-base text-forest-deep/70 leading-relaxed pt-1">
                  {step}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <Divider />

        {/* Share Row */}
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-sm text-forest-deep/50 font-medium tracking-wide uppercase text-xs mr-2">
            Share
          </span>
          <button
            type="button"
            onClick={copyLink}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium border border-forest/10 rounded-lg text-forest-deep/70 hover:text-forest-deep hover:border-gold/30 transition-all"
          >
            <LinkIcon className="w-3.5 h-3.5" />
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
          <a
            href={`https://wa.me/${site.contact.whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(`Check out this recipe: ${recipe.title} — ${typeof window !== 'undefined' ? window.location.href : ''}`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium border border-forest/10 rounded-lg text-forest-deep/70 hover:text-forest-deep hover:border-gold/30 transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            WhatsApp
          </a>
        </div>

        <Divider />

        {/* Related Recipes */}
        <div>
          <h3 className="font-display text-xl text-forest-deep mb-6">
            More Recipes
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/recipes/${r.slug}`}
                className="group block"
              >
                <div className="relative aspect-4/3 rounded-xl overflow-hidden border border-white/5 group-hover:border-gold/30 transition-all">
                  <MotionLoop
                    src={r.loop}
                    poster={r.poster}
                    aspect="4/3"
                    alt={r.title}
                  />
                </div>
                <div className="mt-2.5">
                  <p className="text-sm font-display text-forest-deep group-hover:text-gold transition-colors leading-tight">
                    {r.title}
                  </p>
                  <p className="text-xs text-forest-deep/50 mt-0.5">{r.time}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA Band */}
        <div className="bg-gradient-to-r from-gold/10 to-gold/5 border border-gold/20 rounded-2xl p-6 sm:p-8 text-center">
          <p className="font-display text-xl sm:text-2xl text-forest-deep mb-2">
            Made with Golden Deer Classic Roast
          </p>
          <p className="text-sm text-forest-deep/60 mb-5">
            Every recipe starts with the cleanest crunch in India.
          </p>
          <Button variant="gold-solid" href="/products/classic-roast">
            Shop Classic Roast
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Container>
  )
}
