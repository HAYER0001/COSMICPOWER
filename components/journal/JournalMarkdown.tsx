import type { ReactNode } from 'react'
import Link from 'next/link'

function inline(text: string): ReactNode[] {
  const tokens = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^\s)]+\))/g)
  return tokens.map((token, i) => {
    if (token.startsWith('**') && token.endsWith('**')) {
      return <strong key={i} className="font-semibold text-forest-deep">{token.slice(2, -2)}</strong>
    }
    if (token.startsWith('*') && token.endsWith('*')) return <em key={i}>{token.slice(1, -1)}</em>
    const link = token.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/)
    if (link && (/^\/(?!\/)/.test(link[2]) || /^https:\/\//.test(link[2]))) {
      return <Link key={i} href={link[2]} className="text-gold-deep underline underline-offset-4 hover:text-forest-deep">{link[1]}</Link>
    }
    return token
  })
}

function cells(line: string) {
  return line.replace(/^\|\s*|\s*\|$/g, '').split('|').map((cell) => cell.trim())
}

// A small, non-executing renderer for the Markdown features in our local articles.
// React escapes raw HTML/JSX; no source text is inserted with innerHTML.
export default function JournalMarkdown({ source }: { source: string }) {
  const blocks = source.split(/\r?\n\s*\r?\n/).filter(Boolean)
  return (
    <div className="space-y-6 text-sm sm:text-base text-forest-deep/75 leading-relaxed">
      {blocks.map((block, index) => {
        const lines = block.split(/\r?\n/)
        const heading = block.match(/^(#{1,3})\s+([^\n]+)$/)
        if (heading) {
          const id = heading[2].toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
          return heading[1].length === 3
            ? <h3 key={index} id={id} className="font-display text-xl sm:text-2xl text-forest-deep pt-3 scroll-mt-24">{inline(heading[2])}</h3>
            : <h2 key={index} id={id} className="font-display text-2xl sm:text-3xl text-forest-deep pt-5 scroll-mt-24">{inline(heading[2])}</h2>
        }
        if (lines.every((line) => /^>\s?/.test(line))) {
          return <blockquote key={index} className="border-l-2 border-gold bg-gold/5 px-5 py-4 rounded-r-xl">{inline(lines.map((line) => line.replace(/^>\s?/, '')).join(' '))}</blockquote>
        }
        if (lines.length > 1 && /^\|?\s*:?-{3,}/.test(lines[1])) {
          const headers = cells(lines[0])
          return (
            <div key={index} className="overflow-x-auto rounded-xl border border-forest/10">
              <table className="w-full min-w-[28rem] text-left text-sm">
                <thead className="bg-gold/10 text-forest-deep"><tr>{headers.map((cell, i) => <th key={i} scope="col" className="px-4 py-3 font-semibold">{inline(cell)}</th>)}</tr></thead>
                <tbody>{lines.slice(2).map((line, i) => <tr key={i} className="border-t border-forest/10">{cells(line).map((cell, j) => <td key={j} className="px-4 py-3 align-top">{inline(cell)}</td>)}</tr>)}</tbody>
              </table>
            </div>
          )
        }
        if (lines.every((line) => /^[-*]\s+/.test(line))) {
          return <ul key={index} className="list-disc pl-6 space-y-2 marker:text-gold">{lines.map((line, i) => <li key={i}>{inline(line.replace(/^[-*]\s+/, ''))}</li>)}</ul>
        }
        if (lines.every((line) => /^\d+\.\s+/.test(line))) {
          return <ol key={index} className="list-decimal pl-6 space-y-2 marker:text-gold-deep">{lines.map((line, i) => <li key={i}>{inline(line.replace(/^\d+\.\s+/, ''))}</li>)}</ol>
        }
        return <p key={index}>{inline(lines.join(' '))}</p>
      })}
    </div>
  )
}
