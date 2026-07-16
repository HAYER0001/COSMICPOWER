import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')

const key = '9ab8000ebeeda97d2a754f132a1a6ed5'
const host = 'www.cosmicpower.ltd'
const keyLocation = `https://${host}/${key}.txt`

const sitemapUrl = `https://${host}/sitemap.xml`
const resp = await fetch(sitemapUrl)
if (!resp.ok) {
  console.error(`Failed to fetch sitemap at ${sitemapUrl}: ${resp.status}`)
  process.exit(1)
}
const sitemapText = await resp.text()
const urls = [...sitemapText.matchAll(/<loc>(https?:\/\/[^<]+)<\/loc>/g)].map(
  (m) => m[1]
)

console.log(`Found ${urls.length} URLs in sitemap`)

const body = JSON.stringify({
  host,
  key,
  keyLocation,
  urlList: urls,
})

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body,
})

if (response.ok) {
  console.log(`IndexNow ping SUCCESS — ${response.status} ${response.statusText}`)
  console.log(`Submitted ${urls.length} URLs for ${host}`)
} else {
  const text = await response.text()
  console.error(`IndexNow ping FAILED — ${response.status} ${response.statusText}`)
  console.error('Response:', text)
  process.exit(1)
}
