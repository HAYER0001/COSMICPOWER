import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
}

export default function NotFound() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden bg-cream">
      <div className="absolute inset-0 bg-grain opacity-30" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div className="gold-particle" style={{ top: '15%', left: '20%', width: 4, height: 4, animationDelay: '0s' }} />
        <div className="gold-particle" style={{ top: '25%', left: '70%', width: 3, height: 3, animationDelay: '0.4s' }} />
        <div className="gold-particle" style={{ top: '55%', left: '15%', width: 5, height: 5, animationDelay: '0.8s' }} />
        <div className="gold-particle" style={{ top: '70%', left: '80%', width: 3, height: 3, animationDelay: '1.2s' }} />
        <div className="gold-particle" style={{ top: '40%', left: '50%', width: 4, height: 4, animationDelay: '0.2s' }} />
        <div className="gold-particle" style={{ top: '80%', left: '35%', width: 3, height: 3, animationDelay: '0.6s' }} />
        <div className="gold-particle" style={{ top: '10%', left: '85%', width: 4, height: 4, animationDelay: '1s' }} />
        <div className="gold-particle" style={{ top: '60%', left: '60%', width: 2, height: 2, animationDelay: '1.4s' }} />
        <div className="gold-particle" style={{ top: '35%', left: '30%', width: 3, height: 3, animationDelay: '0.3s' }} />
        <div className="gold-particle" style={{ top: '90%', left: '10%', width: 4, height: 4, animationDelay: '0.9s' }} />
        <div className="gold-particle" style={{ top: '20%', left: '45%', width: 2, height: 2, animationDelay: '1.1s' }} />
        <div className="gold-particle" style={{ top: '75%', left: '55%', width: 3, height: 3, animationDelay: '0.5s' }} />
        <div className="gold-particle" style={{ top: '45%', left: '75%', width: 5, height: 5, animationDelay: '1.3s' }} />
        <div className="gold-particle" style={{ top: '50%', left: '10%', width: 2, height: 2, animationDelay: '0.7s' }} />
        <div className="gold-particle" style={{ top: '30%', left: '90%', width: 4, height: 4, animationDelay: '1.5s' }} />
      </div>

      <div className="relative z-10 text-center px-4 max-w-lg mx-auto">
        <span className="block text-8xl sm:text-9xl font-display font-bold text-gold-gradient mb-4">
          404
        </span>
        <p className="text-xl sm:text-2xl font-display text-forest-deep mb-2">
          This trail went quiet
        </p>
        <p className="text-sm sm:text-base text-forest-deep/50 mb-10 leading-relaxed">
          The page you are looking for has wandered off the path. Let us guide
          you back.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide transition-all duration-200 active:scale-[0.97] bg-gold text-forest-deep hover:bg-gold-light hover:shadow-gold-glow-sm"
          >
            Go Home
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium tracking-wide transition-all duration-200 active:scale-[0.97] border border-gold text-gold hover:bg-gold hover:text-forest-deep hover:shadow-gold-glow-sm"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  )
}
