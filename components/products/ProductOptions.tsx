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
  const price = product.variants.find((v) => v.weight === selectedVariant)?.price ?? 0

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
        <div className="flex gap-2">
          {product.variants.map(({ weight }) => (
            <button
              key={weight}
              onClick={() => setSelectedVariant(weight)}
              className={`px-4 py-2 text-sm font-medium rounded-md border transition-all ${
                selectedVariant === weight
                  ? 'border-gold bg-gold/10 text-forest-deep'
                  : 'border-forest/10 text-forest-deep/60 hover:border-gold/30'
              }`}
            >
              {weight}
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
          <p className="font-display text-2xl text-forest-deep">₹{price * quantity}</p>
        </div>
      </div>

      <Button onClick={handleAddToCart} variant="gold-solid" className="w-full mt-2">
        <ShoppingBag className="w-5 h-5" />
        Add to Cart
      </Button>
    </div>
  )
}
