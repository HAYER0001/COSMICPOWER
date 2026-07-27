'use client'

import { useState } from 'react'
import type { FAQ } from '@/content/faq'

interface AccordionItemProps {
  faq: FAQ
  defaultOpen?: boolean
}

function AccordionItem({ faq, defaultOpen = false }: AccordionItemProps) {
  const [open, setOpen] = useState(defaultOpen)
  const id = faq.question.replace(/\s+/g, '-').toLowerCase().replace(/[^a-z0-9-]/g, '')

  return (
    <div className="border-b border-gold/10 last:border-b-0">
      <h2>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={`faq-panel-${id}`}
          className="flex w-full items-center justify-between gap-4 py-5 text-left text-sm font-medium text-forest-deep transition-colors hover:text-gold"
        >
          <span>{faq.question}</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`shrink-0 text-gold transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </h2>
      <div
        id={`faq-panel-${id}`}
        role="region"
        aria-labelledby={id}
        hidden={!open}
        className={`overflow-hidden transition-all duration-300 ${open ? 'pb-5' : 'max-h-0'}`}
      >
        <p className="text-sm text-forest-deep/60 leading-relaxed">{faq.answer}</p>
      </div>
    </div>
  )
}

interface FAQAccordionProps {
  items: FAQ[]
  title: string
}

export default function FAQAccordion({ items, title }: FAQAccordionProps) {
  return (
    <section className="space-y-2">
      <h2 className="text-xs font-semibold tracking-[0.15em] uppercase text-gold">{title}</h2>
      <div className="divide-y divide-gold/10 rounded-lg border border-gold/10 bg-cream-dark px-5">
        {items.map((item) => (
          <AccordionItem key={item.question} faq={item} />
        ))}
      </div>
    </section>
  )
}
