'use client'

import dynamic from 'next/dynamic'
import MotionLoop from '@/components/shared/MotionLoop'
import ScrollReveal from '@/components/shared/ScrollReveal'
import ParallaxSection from '@/components/shared/ParallaxSection'

const StoryPrologue = dynamic(() => import('@/components/three/StoryPrologue'), { ssr: false })
import {
  Container,
  SectionHeading,
  Button,
  Divider,
} from '@/components/shared/primitives'
import { site } from '@/content/site'

interface Chapter {
  video: string
  poster: string
  number: string
  title: string
  paragraphs: string[]
}

const chapters: Chapter[] = [
  {
    video: '/videos/story/story-1.mp4',
    poster: '',
    number: '01',
    title: 'The Wetlands & Our Farmers',
    paragraphs: [
      'Golden Deer makhana begins its journey in the pristine wetlands of India\'s key cultivating belts — where centuries-old farming traditions meet modern sustainable agriculture. These floodplains, fed by monsoon rhythms, create the perfect conditions for hand-harvesting the finest Euryale ferox seeds.',
      'Through direct farmer partnerships, we ensure fair-trade practices that protect grower margins and empower entire communities. Every seed is hand-harvested with care, preserving the delicate ecosystem that produces the world\'s most prized fox nuts.',
    ],
  },
  {
    video: '/videos/story/story-2.mp4',
    poster: '',
    number: '02',
    title: 'The Sort',
    paragraphs: [
      'Only the largest, brightest jumbo seeds earn the Golden Deer name. Each harvest passes through rigorous hand-sorting — a meticulous process where skilled graders evaluate size, colour, and density seed by seed.',
      'We grade by suta size: 5\u20136 suta jumbo seeds for premium retail, 4\u20135 suta for culinary and roasting applications. Every popped makhana is evaluated for bloom, texture, and consistency. Imperfect pieces never reach the pouch.',
    ],
  },
  {
    video: '/videos/story/story-3.mp4',
    poster: '',
    number: '03',
    title: 'The Roast',
    paragraphs: [
      'Touchless slow-roasting in small batches \u2014 this is where raw seeds transform into Golden Deer\'s signature crunch. No frying, no artificial flavours. Just precise heat and timing that coaxes out each seed\'s natural nutty character.',
      'We use minimal healthy fats to achieve the perfect roast profile: a satisfying crackle that yields to a light, airy pop. Every batch is tested for texture and taste before it receives the Golden Deer seal.',
    ],
  },
  {
    video: '/videos/story/story-4.mp4',
    poster: '',
    number: '04',
    title: 'The Pack',
    paragraphs: [
      'Crunch is the enemy of stale. That\'s why every Golden Deer pouch uses airtight nitrogen-flushed packaging \u2014 locking in freshness from the moment it leaves our facility to the instant you tear it open.',
      'Our packaging barrier protects against moisture, oxygen, and light, preserving the just-roasted texture and natural flavour for months. Each pouch is a time capsule of peak freshness.',
    ],
  },
]

const pillars = [
  {
    title: 'Quality Sourcing',
    description:
      'Direct farmer partnerships in pristine wetland ecosystems. We know exactly where every seed comes from and who grew it.',
  },
  {
    title: 'Purity & Hygiene',
    description:
      'Touchless processing, nitrogen-flushed packaging, and rigorous quality gates at every stage. No shortcuts. No exceptions.',
  },
  {
    title: 'Premium Aesthetic',
    description:
      'From jumbo-grade seeds to handcrafted pouches, every detail reflects the care that goes into India\'s finest roasted makhana.',
  },
]

const certifications = [
  {
    name: 'Startup India',
    id: site.legal.startupIndia,
    href: 'https://www.startupindia.gov.in/',
  },
  {
    name: 'MSME',
    id: site.legal.msme,
    href: '#',
  },
]

export default function OurStoryClient() {
  return (
    <>
      <ScrollReveal>
        <section className="relative py-24 sm:py-32 lg:py-40 overflow-hidden">
          <div className="absolute inset-0 bg-grain opacity-60" />
          <Container className="relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <p
                data-reveal
                className="text-xs sm:text-sm font-semibold tracking-[0.2em] uppercase text-gold/80 mb-6"
              >
                Our Story
              </p>
              <h1
                data-reveal
                className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-tight text-forest-deep"
              >
                From Pristine Wetlands
                <br />
                <span className="text-gold-gradient">to Your Table</span>
              </h1>
              <p
                data-reveal
                className="mt-6 text-base sm:text-lg text-forest-deep/60 max-w-2xl mx-auto leading-relaxed"
              >
                Golden Deer is more than premium roasted makhana. It is a bridge
                between ancient superfood wisdom and modern nutritional needs —
                built on direct farmer partnerships, hand-sorted quality, and
                uncompromising purity.
              </p>
            </div>
          </Container>
        </section>
      </ScrollReveal>

      <StoryPrologue />

      {chapters.map((ch, i) => (
        <ScrollReveal key={ch.number}>
          <section className="py-16 sm:py-20 lg:py-28">
            <ParallaxSection>
              <Container>
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                  <div
                    data-reveal
                    data-parallax-media
                    className={i % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}
                  >
                    <MotionLoop
                      src={ch.video}
                      poster={ch.poster}
                      aspect="4/3"
                      alt={ch.title}
                      className="rounded-lg overflow-hidden shadow-gold-glow-sm"
                    />
                  </div>
                  <div
                    data-reveal
                    data-parallax-text
                    className={i % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}
                  >
                    <span className="inline-block text-6xl sm:text-7xl lg:text-8xl font-display font-bold text-gold/10 leading-none mb-2 select-none">
                      {ch.number}
                    </span>
                    <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl text-forest-deep leading-tight mt-2 mb-4">
                      {ch.title}
                    </h2>
                    {ch.paragraphs.map((p, pi) => (
                      <p
                        key={pi}
                        className="text-sm sm:text-base text-forest-deep/60 leading-relaxed mb-4 last:mb-0"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </Container>
            </ParallaxSection>
          </section>
        </ScrollReveal>
      ))}

      <ScrollReveal>
        <section className="py-16 sm:py-20 lg:py-28 bg-cream-dark/30">
          <Container>
            <SectionHeading
              eyebrow="Our Commitments"
              title="Core Pillars"
              align="center"
              className="mb-12 lg:mb-16"
            />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {pillars.map((p) => (
                <div
                  key={p.title}
                  data-reveal
                  className="p-6 sm:p-8 rounded-lg border border-gold/10 bg-cream/50 hover:border-gold/25 transition-colors duration-300"
                >
                  <div className="w-10 h-px bg-gold/40 mb-5" />
                  <h3 className="font-display text-xl sm:text-2xl text-forest-deep mb-3">
                    {p.title}
                  </h3>
                  <p className="text-sm sm:text-base text-forest-deep/60 leading-relaxed">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-16 sm:py-20 lg:py-28">
          <Container>
            <div className="grid sm:grid-cols-2 gap-8 lg:gap-16">
              <div data-reveal>
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-3 block">
                  Our Vision
                </span>
                <p className="font-display text-2xl sm:text-3xl lg:text-4xl text-forest-deep leading-tight">
                  Make Golden Deer a household name in healthy snacking.
                </p>
              </div>
              <div data-reveal>
                <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-3 block">
                  Our Mission
                </span>
                <p className="font-display text-2xl sm:text-3xl lg:text-4xl text-forest-deep leading-tight">
                  Sustainably sourced, ethically processed superfood snacks that
                  empower farming partner communities.
                </p>
              </div>
            </div>
          </Container>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="py-16 sm:py-20 lg:py-28 bg-cream-dark/30">
          <Container>
            <SectionHeading
              eyebrow="Recognition"
              title="Certifications & Credentials"
              align="center"
              className="mb-12 lg:mb-16"
            />
            <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
              {certifications.map((cert) => (
                <a
                  key={cert.name}
                  href={cert.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-reveal
                  className="flex flex-col items-center p-8 sm:p-10 rounded-lg border border-gold/10 bg-cream/50 hover:border-gold/25 min-w-[200px] transition-colors duration-300"
                >
                  <span className="text-xs font-semibold tracking-[0.15em] uppercase text-gold mb-2">
                    {cert.name}
                  </span>
                  <span className="text-sm text-forest-deep/50 font-mono text-center">
                    {cert.id}
                  </span>
                </a>
              ))}
            </div>
          </Container>
        </section>
      </ScrollReveal>

      <ScrollReveal>
        <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden">
          <div className="absolute inset-0 bg-grain opacity-40" />
          <Container className="relative z-10">
            <div data-reveal className="max-w-4xl mx-auto text-center">
              <svg
                className="mx-auto mb-6 text-gold/20 w-10 h-10 sm:w-12 sm:h-12"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
              </svg>
              <blockquote className="font-display text-2xl sm:text-3xl lg:text-4xl text-forest-deep/80 leading-relaxed italic">
                &ldquo;Every pouch of Golden Deer carries the care of the farmers
                who hand-harvest it, the eyes of the sorters who grade it, and the
                precision of a roast that respects the seed.&rdquo;
              </blockquote>
            </div>
          </Container>
        </section>
      </ScrollReveal>

      <Divider />

      <ScrollReveal>
        <section className="py-16 sm:py-20 lg:py-28">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h2
                data-reveal
                className="font-display text-3xl sm:text-4xl lg:text-5xl leading-tight text-forest-deep mb-4"
              >
                Experience the{' '}
                <span className="text-gold-gradient">Golden Deer</span> Difference
              </h2>
              <p
                data-reveal
                className="text-base sm:text-lg text-forest-deep/60 max-w-xl mx-auto leading-relaxed mb-8"
              >
                From our farm partners to your table — taste the purity of premium
                roasted makhana, crafted with care.
              </p>
              <div
                data-reveal
                className="flex flex-col sm:flex-row items-center justify-center gap-4"
              >
                <Button variant="gold-solid" href="/products">
                  Shop the Range
                </Button>
                <Button variant="gold-outline" href="/bulk">
                  Bulk &amp; Wholesale
                </Button>
              </div>
            </div>
          </Container>
        </section>
      </ScrollReveal>
    </>
  )
}
