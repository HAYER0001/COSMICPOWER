'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight, Leaf } from 'lucide-react'

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
    if (!video || reduced.matches || connection?.saveData) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !document.hidden) void video.play().catch(() => {})
      else video.pause()
    }, { threshold: 0.2 })
    observer.observe(video)
    const pauseWhenHidden = () => { if (document.hidden) video.pause() }
    document.addEventListener('visibilitychange', pauseWhenHidden)
    return () => {
      observer.disconnect()
      video.pause()
      document.removeEventListener('visibilitychange', pauseWhenHidden)
    }
  }, [])

  return (
    <section className="relative overflow-hidden bg-forest-deep text-cream">
      <div className="pointer-events-none absolute -left-40 top-10 h-[500px] w-[500px] rounded-full border border-gold/10" aria-hidden />
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pb-10 pt-12 sm:px-8 sm:py-16 lg:min-h-[760px] lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-12 lg:py-20">
        <div className="relative z-10">
          <p className="mb-7 flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-gold-light sm:text-xs">
            <span className="h-px w-8 bg-gold" /> From the heart of Bihar
          </p>
          <h1 className="font-display text-[3.7rem] leading-[0.98] tracking-tight sm:text-7xl lg:text-[6rem]">
            A little golden.<br /><span className="italic text-gold-light">A lot of good.</span>
          </h1>
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-gold-light/90">Golden Deer · Premium Makhana</p>
          <p className="mt-5 max-w-md text-base leading-relaxed text-cream/75 sm:text-lg">
            Hand-picked fox nuts, slowly roasted for a beautifully light crunch. Discover your everyday favourite, rooted in Bihar.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/products" className="inline-flex items-center gap-6 rounded-full bg-gold-light px-6 py-3.5 text-sm font-semibold text-forest-deep transition-colors hover:bg-cream">
              Find your flavour <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link href="/bulk" className="inline-flex items-center gap-2 rounded-full border border-cream/25 px-5 py-3.5 text-sm text-cream transition-colors hover:border-gold-light hover:text-gold-light">
              For your business <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-cream/15 pt-6 text-xs text-cream/65">
            <span className="inline-flex items-center gap-2"><Leaf className="h-4 w-4 text-gold-light" /> Slow-roasted</span>
            <span>No artificial preservatives</span>
            <span>Made in India</span>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
          <div className="relative aspect-[4/4.1] overflow-hidden rounded-t-[45%] rounded-b-2xl border border-gold/25 bg-forest-light sm:aspect-[4/4.6]">
            <Image src="/videos/hero-poster.jpg" alt="Golden Deer makhana in its signature gold pouch" fill priority sizes="(max-width: 1024px) 90vw, 45vw" className="object-cover" />
            <video ref={videoRef} muted loop playsInline preload="none" poster="/videos/hero-poster.jpg" aria-hidden className="absolute inset-0 h-full w-full object-cover">
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-deep/90 to-transparent px-6 pb-6 pt-20">
              <p className="text-[10px] uppercase tracking-[0.25em] text-gold-light">Thoughtfully sourced. Simply delicious.</p>
              <p className="mt-2 font-display text-2xl text-cream">Goodness in every golden puff.</p>
            </div>
          </div>
          <div className="absolute -right-2 top-8 flex h-20 w-20 rotate-12 flex-col items-center justify-center rounded-full border border-gold/50 bg-cream text-center text-forest-deep shadow-lg sm:-right-5 sm:h-24 sm:w-24">
            <Leaf className="mb-1 h-5 w-5 text-gold-deep" />
            <span className="text-[9px] font-semibold uppercase leading-tight tracking-widest">Rooted<br />in nature</span>
          </div>
        </div>
      </div>
      <div className="mx-auto hidden max-w-7xl items-center justify-between border-t border-cream/10 px-12 py-5 text-[10px] uppercase tracking-[0.2em] text-cream/50 lg:flex">
        <span>Golden Deer by Cosmic Power Pvt. Ltd.</span>
        <Link href="#collection" className="flex items-center gap-3 hover:text-gold-light">Explore the collection <ArrowDown className="h-3 w-3" /></Link>
      </div>
    </section>
  )
}
