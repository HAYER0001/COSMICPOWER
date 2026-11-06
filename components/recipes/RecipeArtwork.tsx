import Image from 'next/image'
import type { Recipe } from '@/content/recipes'
import { getRecipePairing } from '@/content/recipe-pairings'
import { CookingPot } from 'lucide-react'

export default function RecipeArtwork({
  recipe,
  hero = false,
}: {
  recipe: Recipe
  hero?: boolean
}) {
  const product = getRecipePairing(recipe.slug)
  return (
    <div className={`relative overflow-hidden bg-cream-dark/60 ${hero ? 'aspect-video' : 'aspect-4/3'}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-forest/5" />
      <div className={`absolute inset-y-0 left-0 z-10 flex w-[49%] flex-col justify-center ${hero ? 'pl-5 sm:pl-12' : 'pl-4 sm:pl-5'}`}>
        <CookingPot aria-hidden className={`${hero ? 'h-6 w-6 sm:h-9 sm:w-9 mb-3' : 'h-5 w-5 mb-2'} text-gold-deep`} />
        <p className={`uppercase tracking-[0.18em] text-forest/60 font-medium ${hero ? 'text-[9px] sm:text-xs mb-2 sm:mb-4' : 'text-[8px] sm:text-[9px] mb-2'}`}>
          The Golden Deer kitchen
        </p>
        <p className={`font-display leading-tight text-forest-deep ${hero ? 'text-xl sm:text-3xl lg:text-4xl' : 'text-base sm:text-xl'}`}>
          {recipe.title.replace(/ Recipe$/, '')}
        </p>
        <p className={`text-forest/60 ${hero ? 'text-[10px] sm:text-sm mt-3 sm:mt-5' : 'text-[10px] mt-3'}`}>
          {recipe.time} · Serves {recipe.serves}
        </p>
      </div>
      <div className="absolute inset-y-0 right-0 w-[54%]">
        <Image
          src={product.poster}
          alt={`${product.name} makhana — an ingredient for this recipe`}
          fill
          className={`object-contain ${hero ? 'p-3 sm:p-8' : 'p-3 sm:p-5'}`}
          sizes={hero ? '(max-width: 768px) 54vw, 640px' : '(max-width: 640px) 54vw, 240px'}
          priority={hero}
        />
      </div>
    </div>
  )
}
