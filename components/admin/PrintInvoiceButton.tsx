'use client'

import { Printer } from 'lucide-react'

export default function PrintInvoiceButton() {
  return (
    <button
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-md bg-[#0F2E1E] px-4 py-2 text-sm font-medium text-[#E8C97A] shadow hover:bg-black transition-colors"
    >
      <Printer className="h-4 w-4" />
      Print / Save PDF
    </button>
  )
}
