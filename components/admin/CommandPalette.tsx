'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { Search, Package, Truck, RotateCcw, FileText, ShoppingBag, ExternalLink, X, Command } from 'lucide-react'

interface CommandItem {
  id: string
  label: string
  category: string
  icon: React.ComponentType<{ className?: string }>
  perform: () => void
  shortcut?: string
}

export default function CommandPalette() {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)

  const items: CommandItem[] = [
    {
      id: 'all-orders',
      label: 'View All Orders',
      category: 'Navigation',
      icon: Package,
      perform: () => router.push('/admin?status=all'),
      shortcut: 'G A',
    },
    {
      id: 'paid-orders',
      label: 'View Paid Orders (Awaiting Shipment)',
      category: 'Navigation',
      icon: Package,
      perform: () => router.push('/admin?status=PAID'),
      shortcut: 'G P',
    },
    {
      id: 'shipped-orders',
      label: 'View In-Transit Orders',
      category: 'Navigation',
      icon: Truck,
      perform: () => router.push('/admin?status=SHIPPED'),
      shortcut: 'G S',
    },
    {
      id: 'returns',
      label: 'View Returns Queue',
      category: 'Navigation',
      icon: RotateCcw,
      perform: () => router.push('/admin?status=RETURNED'),
      shortcut: 'G R',
    },
    {
      id: 'export-csv',
      label: 'Download Financial & GST Tax Export (CSV)',
      category: 'Reports & Accounting',
      icon: FileText,
      perform: () => window.open('/api/admin/export', '_blank'),
      shortcut: 'E',
    },
    {
      id: 'view-store',
      label: 'Open Live Storefront (cosmicpower.ltd)',
      category: 'Quick Links',
      icon: ExternalLink,
      perform: () => window.open('/', '_blank'),
    },
    {
      id: 'products-catalogue',
      label: 'Browse Product Catalogue',
      category: 'Quick Links',
      icon: ShoppingBag,
      perform: () => router.push('/products'),
    },
  ]

  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  )

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Open on Cmd+K or Ctrl+K
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      setIsOpen((prev) => !prev)
    }

    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 bg-black/60 backdrop-blur-sm p-4">
      <div
        className="w-full max-w-xl overflow-hidden rounded-xl bg-white shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-100"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center border-b border-gray-200 px-4 py-3 bg-gray-50">
          <Search className="h-5 w-5 text-gray-400 mr-3 shrink-0" />
          <input
            autoFocus
            type="text"
            placeholder="Type a command or jump to screen... (e.g. Paid, Export, Shipped)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setSelectedIndex(0)
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault()
                setSelectedIndex((prev) => (prev + 1) % (filtered.length || 1))
              } else if (e.key === 'ArrowUp') {
                e.preventDefault()
                setSelectedIndex((prev) => (prev - 1 + filtered.length) % (filtered.length || 1))
              } else if (e.key === 'Enter' && filtered[selectedIndex]) {
                e.preventDefault()
                filtered[selectedIndex].perform()
                setIsOpen(false)
              }
            }}
            className="w-full bg-transparent text-sm text-gray-900 outline-none placeholder-gray-400"
          />
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded text-gray-400 hover:text-gray-600 ml-2"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 divide-y divide-gray-100">
          {filtered.length > 0 ? (
            filtered.map((item, index) => {
              const Icon = item.icon
              const isSelected = index === selectedIndex
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    item.perform()
                    setIsOpen(false)
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left text-sm transition-colors ${
                    isSelected ? 'bg-[#0F2E1E] text-[#E8C97A]' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-4 w-4 ${isSelected ? 'text-[#E8C97A]' : 'text-gray-500'}`} />
                    <div>
                      <p className="font-medium leading-none">{item.label}</p>
                      <p className={`text-[11px] mt-0.5 ${isSelected ? 'text-[#E8C97A]/70' : 'text-gray-400'}`}>
                        {item.category}
                      </p>
                    </div>
                  </div>
                  {item.shortcut && (
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                        isSelected
                          ? 'border-[#E8C97A]/40 text-[#E8C97A]'
                          : 'border-gray-200 bg-gray-50 text-gray-500'
                      }`}
                    >
                      {item.shortcut}
                    </span>
                  )}
                </button>
              )
            })
          ) : (
            <div className="p-8 text-center text-sm text-gray-500">
              No matching actions or screens found.
            </div>
          )}
        </div>

        <div className="flex items-center justify-between px-4 py-2 border-t border-gray-100 bg-gray-50 text-[11px] text-gray-500">
          <div className="flex items-center gap-3">
            <span><strong>↑↓</strong> to navigate</span>
            <span><strong>↵</strong> to select</span>
            <span><strong>esc</strong> to close</span>
          </div>
          <span className="flex items-center gap-1">
            <Command className="h-3 w-3" /> + K
          </span>
        </div>
      </div>
    </div>
  )
}
