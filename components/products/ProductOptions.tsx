'use client'

import { useState } from 'react'
import { Product } from '@/content/products'
import { useCartStore } from '@/lib/store/useCartStore'
import { Button } from '@/components/shared/primitives'
import { ShoppingBag, Minus, Plus } from 'lucide-react'

export function ProductOptions({ product }: { product: Product }) {
  const { addItem } = useCartStore()
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]?.weight ?? '')
  const [quantity, setQuantity] = useState(1)

  // Display price only — the server re-derives it at checkout from the same source.
  const currentVariant = product.variants.find((v) => v.weight === selectedVariant)
  const price = currentVariant?.price ?? 0
  const originalPrice = currentVariant?.originalPrice

  const handleAddToCart = () => {
    addItem({
      productSlug: product.slug,
      name: product.name,
      variant: selectedVariant,
      price: price,
      quantity,
      image: product.poster,
    })
  }

  if (!product.variants || product.variants.length === 0) return null

  return (
    <div className="flex flex-col gap-4 mb-6 p-4 rounded-xl border border-gold/20 bg-gold/5">
      <div>
        <h4 className="text-sm font-medium text-forest-deep mb-2">Select Size</h4>
        <div className="flex gap-2 flex-wrap">
          {product.variants.map(({ weight, originalPrice: vOrigPrice }) => (
            <button
              key={weight}
              onClick={() => setSelectedVariant(weight)}
              className={`px-4 py-2 text-sm font-medium rounded-md border transition-all flex items-center gap-1.5 ${
                selectedVariant === weight
                  ? 'border-gold bg-gold/10 text-forest-deep'
                  : 'border-forest/10 text-forest-deep/60 hover:border-gold/30'
              }`}
            >
              <span>{weight}</span>
              {vOrigPrice && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold">
                  25% OFF
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <h4 className="text-sm font-medium text-forest-deep mb-2">Quantity</h4>
          <div className="flex items-center rounded-md border border-forest/20 bg-white">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-2 text-forest-deep hover:bg-forest/5"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-4 font-medium text-forest-deep text-center min-w-[2.5rem]">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-2 text-forest-deep hover:bg-forest/5"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-sm text-forest-deep/60">Total</p>
          <div className="flex items-baseline gap-2 justify-end">
            {originalPrice && (
              <span className="text-sm text-forest-deep/40 line-through">₹{originalPrice * quantity}</span>
            )}
            <p className="font-display text-2xl text-forest-deep">₹{price * quantity}</p>
          </div>
          {product.slug === 'raw-makhana' && selectedVariant === '200gm' && (
            <p className="text-[11px] font-semibold text-emerald-700 mt-1">
              🔥 25% OFF · Free Transportation Included
            </p>
          )}
        </div>
      </div>

      <Button onClick={handleAddToCart} variant="gold-solid" className="w-full mt-2">
        <ShoppingBag className="w-5 h-5" />
        Add to Cart
      </Button>
    </div>
  )
}
