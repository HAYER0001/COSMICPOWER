'use client'

import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import MotionLoop from '@/components/shared/MotionLoop'

gsap.registerPlugin(ScrollTrigger)

function useReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  return rm || conn?.saveData === true
}

const STAGES = [
  {
    id: 'harvest',
    label: 'Harvest',
    video: '/videos/story/story-1.mp4',
    poster: '',
    title: 'Hand-harvested from pristine wetlands',
    desc: 'Farmers wade chest-deep into Bihar\'s Gangetic ponds, locating seed pods by feel. Each pod is opened by hand — a skilled harvester collects 10–15 kg of raw seeds per day.',
  },
  {
    id: 'sort',
    label: 'Sort',
    video: '/videos/story/story-2.mp4',
    poster: '',
    title: 'Sorted for jumbo grade only',
    desc: 'Every seed passes through trained sorters who grade by the traditional suta system. Only 5–6 suta jumbo grade (18–24 mm) seeds — the largest, brightest — make the cut.',
  },
  {
    id: 'roast',
    label: 'Roast',
    video: '/videos/story/story-3.mp4',
    poster: '',
    title: 'Touchless dry-roasted to perfection',
    desc: 'In our automated facility, seeds rotate through precision-controlled heat at 200–250 °C. No oil, no frying — just pure heat transforming dense starch into ethereal crunch.',
  },
  {
    id: 'pack',
    label: 'Pack',
    video: '/videos/story/story-4.mp4',
    poster: '',
    title: 'Nitrogen-flushed at peak freshness',
    desc: 'Within hours of roasting, each batch is weighed, bagged, and nitrogen-flushed in barrier pouches. The oxygen-free seal locks in crunch for 12 months — no preservatives needed.',
  },
] as const

const PATHS = {
  seed: 'M30,8 C32,8 52,16 54,44 C56,76 32,88 28,86 C4,74 6,20 8,12 C12,4 28,8 30,8',
  cracked:
    'M30,8 C32,8 42,12 48,32 C54,64 32,88 28,86 C4,74 6,20 8,12 C12,4 28,8 30,8',
  popped:
    'M30,4 C32,4 60,12 62,46 C64,78 32,92 28,90 C-2,78 0,16 2,8 C6,0 28,4 30,4',
}

export default function PondToPack() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const trackerRef = useRef<HTMLDivElement>(null)
  const pathRef = useRef<SVGPathElement>(null)
  const videoRefs = useRef<(HTMLDivElement | null)[]>([])
  const textRefs = useRef<(HTMLDivElement | null)[]>([])
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([])
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion || !pinRef.current) return
    const ctx = gsap.context(() => {
      videoRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.set(el, { autoAlpha: i === 0 ? 1 : 0 })
      })
      textRefs.current.forEach((el, i) => {
        if (!el) return
        gsap.set(el, { autoAlpha: i === 0 ? 1 : 0 })
      })
      labelRefs.current.forEach((el, i) => {
        if (el) gsap.set(el, { autoAlpha: i === 0 ? 1 : 0.3 })
      })
      gsap.set(trackerRef.current, { scaleX: 0 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: pinRef.current,
          start: 'top top',
          end: '+=250vh',
          scrub: 1.2,
        },
        defaults: { ease: 'power2.inOut' },
      })

      tl.to({}, { duration: 1 })

      const stageLen = 0.22
      const fade = 0.06

      for (let i = 1; i < STAGES.length; i++) {
        const enter = (i - 1) * stageLen + stageLen - fade
        const exit = i * stageLen - fade

        const prevVideo = videoRefs.current[i - 1]
        const currVideo = videoRefs.current[i]
        const prevText = textRefs.current[i - 1]
        const currText = textRefs.current[i]
        const currLabel = labelRefs.current[i]
        const prevLabel = labelRefs.current[i - 1]

        if (prevVideo) tl.to(prevVideo, { autoAlpha: 0, duration: fade * 0.8 }, exit)
        if (currVideo) tl.fromTo(currVideo, { autoAlpha: 0 }, { autoAlpha: 1, duration: fade * 0.8 }, enter)
        if (prevText) tl.to(prevText, { autoAlpha: 0, duration: fade * 0.8 }, exit)
        if (currText) tl.fromTo(currText, { autoAlpha: 0 }, { autoAlpha: 1, duration: fade * 0.8 }, enter)
        if (currLabel) tl.to(currLabel, { autoAlpha: 1, duration: fade * 0.5 }, enter)
        if (prevLabel) tl.to(prevLabel, { autoAlpha: 0.3, duration: fade * 0.5 }, enter)
      }

      tl.to(pathRef.current, { attr: { d: PATHS.cracked }, duration: 0.12 }, 0.2)
      tl.to(pathRef.current, { attr: { d: PATHS.popped }, duration: 0.12 }, 0.5)

      tl.fromTo(trackerRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.96, ease: 'none' }, 0.04)
    }, pinRef)

    return () => ctx.revert()
  }, [reducedMotion])

  if (reducedMotion) {
    return (
      <section id="processing" className="scroll-mt-16 py-16 bg-gradient-to-b from-forest-deep/[0.03] to-transparent">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-3">
            From Pond to Pack
          </span>
          <h2 className="font-display text-2xl sm:text-3xl text-forest-deep mb-2">
            How Raw Seeds Become Popped Makhana
          </h2>
          <p className="text-sm sm:text-base text-forest-deep/60 leading-relaxed mb-8 max-w-2xl">
            The journey from wetland to pouch follows a four-stage process perfected over centuries.
          </p>
          <div className="space-y-10">
            {STAGES.map((s, i) => (
              <div key={s.id} className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="w-full sm:w-1/3 rounded-xl overflow-hidden border border-forest/10">
                  <MotionLoop src={s.video} poster={s.poster} alt={s.label} />
                </div>
                <div className="flex-1 pt-1">
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-gold/15 text-gold-deep text-xs font-bold font-mono mb-2">
                    {i + 1}
                  </span>
                  <h3 className="font-display text-lg text-forest-deep mb-1">{s.title}</h3>
                  <p className="text-sm text-forest-deep/70 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={sectionRef} id="processing" className="scroll-mt-16 relative">
      <div ref={pinRef} className="relative h-screen w-full overflow-hidden bg-forest-deep">
        <div className="absolute inset-0">
          {STAGES.map((s, i) => (
            <div
              key={`v-${s.id}`}
              ref={(el) => { videoRefs.current[i] = el }}
              className="absolute inset-0"
            >
              <MotionLoop src={s.video} poster={s.poster} alt={s.label} className="w-full h-full" />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-forest-deep via-forest-deep/30 to-forest-deep/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-deep/60 via-transparent to-forest-deep/40" />

        <div className="absolute inset-x-0 bottom-0 z-10 pb-12 sm:pb-16 lg:pb-20">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 mb-5">
                {STAGES.map((s, i) => (
                  <span
                    key={`l-${s.id}`}
                    ref={(el) => { labelRefs.current[i] = el }}
                    className="text-xs sm:text-sm font-semibold tracking-[0.15em] uppercase text-cream transition-all"
                  >
                    {s.label}
                  </span>
                ))}
              </div>

              <div className="w-full h-0.5 bg-cream/10 rounded-full mb-7 overflow-hidden">
                <div
                  ref={trackerRef}
                  className="h-full bg-gold rounded-full origin-left"
                />
              </div>

              <svg
                className="w-14 h-16 sm:w-16 sm:h-20 mb-4"
                viewBox="0 0 64 96"
                fill="none"
                aria-hidden="true"
              >
                <path
                  ref={pathRef}
                  d={PATHS.seed}
                  stroke="#C9A24B"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              {STAGES.map((s, i) => (
                <div
                  key={`t-${s.id}`}
                  ref={(el) => { textRefs.current[i] = el }}
                >
                  <h3 className="font-display text-xl sm:text-2xl lg:text-3xl text-cream leading-tight mb-3">
                    {s.title}
                  </h3>
                  <p className="text-sm sm:text-base text-cream/70 leading-relaxed max-w-xl">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
