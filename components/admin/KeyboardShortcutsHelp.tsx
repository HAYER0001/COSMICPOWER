'use client'

import { useState, useEffect, useCallback } from 'react'
import { X, Keyboard } from 'lucide-react'

export default function KeyboardShortcutsHelp() {
  const [isOpen, setIsOpen] = useState(false)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Only trigger if not typing in an input or textarea
    if (
      ['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement)?.tagName)
    ) {
      return
    }

    if (e.key === '?') {
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

  const shortcuts = [
    { key: '⌘ + K / Ctrl + K', desc: 'Open Global Universal Command Palette' },
    { key: 'J / K', desc: 'Navigate down / up across order rows' },
    { key: 'Space / Enter', desc: 'Open order in contextual Slide-Over Drawer' },
    { key: 'E', desc: 'Download GST & Accounting CSV Export' },
    { key: 'Esc', desc: 'Close any active slide-over drawer or modal' },
    { key: '?', desc: 'Toggle this keyboard shortcuts cheatsheet' },
  ]

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-100">
        <div className="flex items-center justify-between border-b border-gray-200 pb-3 mb-4">
          <div className="flex items-center gap-2 text-gray-900 font-bold text-base">
            <Keyboard className="h-5 w-5 text-[#0F2E1E]" />
            <h3>Keyboard Shortcuts for Power Users</h3>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {shortcuts.map((s) => (
            <div key={s.key} className="py-2.5 flex items-center justify-between text-sm">
              <span className="text-gray-600">{s.desc}</span>
              <kbd className="px-2 py-1 rounded bg-gray-100 border border-gray-300 font-mono text-xs font-semibold text-gray-800 shadow-sm">
                {s.key}
              </kbd>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-gray-100 pt-3 text-center">
          <p className="text-xs text-gray-400">
            Press <kbd className="px-1 py-0.5 rounded bg-gray-100 border text-[11px]">Esc</kbd> or click outside to dismiss
          </p>
        </div>
      </div>
    </div>
  )
}
