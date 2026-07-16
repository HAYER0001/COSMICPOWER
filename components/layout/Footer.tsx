'use client'

import Link from 'next/link'
import Image from 'next/image'
import { site } from '@/content/site'
import { Container, Divider } from '@/components/shared/primitives'
import MotionLoop from '@/components/shared/MotionLoop'

function SocialInstagram() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
}

function SocialYoutube() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.94 2C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/></svg>
}

function SocialLinkedin() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
}

const socialIcons = [
  { icon: SocialInstagram, href: site.socials.instagram, label: 'Instagram' },
  { icon: SocialYoutube, href: site.socials.youtube, label: 'YouTube' },
  { icon: SocialLinkedin, href: site.socials.linkedin, label: 'LinkedIn' },
]

const policyLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Shipping Policy', href: '/shipping' },
]

export default function Footer() {
  const l = site.legal

  return (
    <footer className="relative bg-cream border-t border-gold/10">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-4">
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Golden Deer"
                width={40}
                height={40}
                className="h-10 w-auto"
                onError={(e) => {
                  const el = e.currentTarget
                  el.style.display = 'none'
                  el.nextElementSibling?.classList.remove('hidden')
                }}
              />
              <span
                className="hidden text-xl font-display text-forest-deep"
              >
                Golden Deer
              </span>
            </Link>
            <p className="text-sm text-forest-deep/50 leading-relaxed max-w-xs">
              Premium roasted makhana — clean-label, slow-roasted, and sourced
              directly from India&apos;s finest growing belts.
            </p>
            <div className="w-24 h-24 overflow-hidden rounded-lg border border-gold/10">
              <MotionLoop
                src="/videos/logo-reveal.mp4"
                poster="/videos/logo-reveal-poster.jpg"
                aspect="1/1"
                alt="Golden Deer logo reveal"
                className="w-full h-full"
              />
            </div>
          </div>

          <div className="lg:col-span-1 space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-gold">
              Explore
            </h4>
            <ul className="space-y-3">
              <li><FooterLink href="/products">All Products</FooterLink></li>
              <li><FooterLink href="/recipes">Recipes</FooterLink></li>
              <li><FooterLink href="/our-story">Our Story</FooterLink></li>
              <li><FooterLink href="/journal">Journal</FooterLink></li>
              <li><FooterLink href="/contact">Contact</FooterLink></li>
            </ul>
          </div>

          <div className="lg:col-span-1 space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-gold">
              For Business
            </h4>
            <ul className="space-y-3">
              <li><FooterLink href="/bulk">Bulk &amp; Wholesale</FooterLink></li>
              <li><FooterLink href="/bulk">Corporate Gifting</FooterLink></li>
            </ul>
          </div>

          <div className="lg:col-span-1 space-y-4">
            <h4 className="text-xs font-semibold tracking-[0.15em] uppercase text-gold">
              Corporate Information
            </h4>
            <div className="space-y-2 text-xs text-forest-deep/40 leading-relaxed">
              <p><span className="text-forest-deep/60">Company:</span> {l.company}</p>
              <p><span className="text-forest-deep/60">CIN:</span> {l.cin}</p>
              <p><span className="text-forest-deep/60">GSTIN:</span> {l.gstin}</p>
              <p><span className="text-forest-deep/60">Startup India:</span> {l.startupIndia}</p>
              <p><span className="text-forest-deep/60">MSME:</span> {l.msme}</p>
              <p><span className="text-forest-deep/60">FSSAI:</span> {l.fssaiLicense}</p>
            </div>
          </div>
        </div>

        <Divider className="my-10" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {socialIcons.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-forest-deep/30 transition-colors hover:text-gold"
              >
                <s.icon />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
            {policyLinks.map((p) => (
              <Link
                key={p.label}
                href={p.href}
                className="text-xs text-forest-deep/30 transition-colors hover:text-forest-deep/60"
              >
                {p.label}
              </Link>
            ))}
          </div>

          <p className="text-xs text-forest-deep/20">
            &copy; {new Date().getFullYear()} {l.company}. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm text-forest-deep/50 transition-colors hover:text-forest-deep"
    >
      {children}
    </Link>
  )
}
