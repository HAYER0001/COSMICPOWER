import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import type { JournalEntry } from './journal'

const directory = path.join(process.cwd(), 'content', 'journal')

export const JOURNAL_COVER = '/videos/products/golden-deer-raw-makhana-200g.jpg'

// These local articles use plain Markdown, not executable MDX. Keep frontmatter
// deliberately limited to scalar strings and never evaluate JSX or expressions.
const articles = readdirSync(directory)
  .filter((file) => /^[a-z0-9-]+\.mdx$/.test(file))
  .map((file) => {
    const source = readFileSync(path.join(directory, file), 'utf8')
    const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
    if (!match) throw new Error(`Missing journal frontmatter: ${file}`)

    const frontmatter: Record<string, string> = {}
    for (const line of match[1].split(/\r?\n/)) {
      const field = line.match(/^([A-Za-z]+):\s*(.*)$/)
      if (!field) continue
      const value = field[2].trim()
      frontmatter[field[1]] = value.replace(/^(["'])([\s\S]*)\1$/, '$2')
    }

    const slug = file.replace(/\.mdx$/, '')
    if (frontmatter.slug !== slug || !frontmatter.title || !frontmatter.excerpt ||
      !/^\d{4}-\d{2}-\d{2}$/.test(frontmatter.date) || !frontmatter.readingTime) {
      throw new Error(`Invalid journal frontmatter: ${file}`)
    }

    const entry: JournalEntry = {
      slug,
      title: frontmatter.title,
      excerpt: frontmatter.excerpt,
      date: frontmatter.date,
      readTime: frontmatter.readingTime,
      cover: JOURNAL_COVER,
    }

    return { entry, markdown: match[2].trim() }
  })

export const journalFromMarkdown = articles.map(({ entry }) => entry)

export function getJournalMarkdown(slug: string) {
  // Lookup a known article rather than using a URL parameter as a file path.
  return articles.find(({ entry }) => entry.slug === slug)?.markdown
}
