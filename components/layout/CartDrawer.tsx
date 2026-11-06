'use client'

import { useCartStore } from '@/lib/store/useCartStore'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Minus, Plus, ShoppingBag } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/shared/primitives'

export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeItem, getTotal } = useCartStore()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-forest-deep/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-md flex-col bg-cream shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-forest/10 px-6 py-4 bg-forest-deep text-gold">
              <h2 className="font-display text-xl flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Your Cart
              </h2>
              <button
                onClick={closeCart}
                className="rounded-full p-2 hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center space-y-4 text-forest-deep/60">
                  <ShoppingBag className="h-12 w-12 opacity-20" />
                  <p>Your cart is empty.</p>
                  <Button variant="gold-outline" onClick={closeCart}>
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <ul className="space-y-6">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4 border-b border-forest/10 pb-6">
                      <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-forest/10 bg-white">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="font-medium text-forest-deep">{item.name}</h3>
                            <p className="font-medium text-forest-deep">
                              ₹{item.price * item.quantity}
                            </p>
                          </div>
                          <p className="text-sm text-forest-deep/60">{item.variant}</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center rounded-md border border-forest/20">
                            <button
                              onClick={() => {
                                if (item.quantity > 1) {
                                  updateQuantity(item.id, item.quantity - 1)
                                } else {
                                  removeItem(item.id)
                                }
                              }}
                              className="px-2 py-1 text-forest-deep hover:bg-forest/5"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="px-2 text-sm text-forest-deep min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="px-2 py-1 text-forest-deep hover:bg-forest/5"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-xs text-red-500 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-forest/10 bg-cream p-6">
                {/* Free Shipping Progress */}
                <div className="mb-4 rounded-lg bg-gold/10 p-3 text-xs border border-gold/20">
                  {getTotal() >= 999 ? (
                    <p className="font-semibold text-emerald-800 flex items-center gap-1.5">
                      <span>🎉</span> You unlocked <strong>FREE Shipping</strong>!
                    </p>
                  ) : (
                    <div>
                      <p className="text-forest-deep/80 mb-1.5">
                        Add <strong className="text-forest-deep">₹{999 - getTotal()}</strong> more for <strong>FREE Delivery</strong> (Standard delivery ₹49)
                      </p>
                      <div className="h-1.5 w-full bg-forest/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gold transition-all duration-300"
                          style={{ width: `${Math.min(100, (getTotal() / 999) * 100)}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between text-lg font-medium text-forest-deep mb-1">
                  <p>Subtotal</p>
                  <p>₹{getTotal()}</p>
                </div>
                <div className="flex justify-between text-sm text-forest-deep/70 mb-4">
                  <p>Estimated Shipping</p>
                  <p>{getTotal() >= 999 ? <span className="text-emerald-700 font-semibold">FREE</span> : '₹49'}</p>
                </div>
                <p className="text-xs text-forest-deep/60 mb-4">
                  All prices include GST. Dispatched within 24–48 hours across India.
                </p>
                <Button className="w-full" variant="gold-solid" href="/checkout">
                  Proceed to Checkout
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
