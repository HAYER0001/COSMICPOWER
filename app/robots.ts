import type { MetadataRoute } from 'next'

const BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'PerplexityBot',
  'Perplexity-User',
  'ClaudeBot',
  'Claude-User',
  'anthropic-ai',
  'Google-Extended',
  'Googlebot',
  'Bingbot',
  'Applebot',
  'Applebot-Extended',
  'CCBot',
  'Amazonbot',
  'meta-externalagent',
  'Bytespider',
  'DuckDuckBot',
  'YandexBot',
  'cohere-ai',
  'Diffbot',
  'Timpibot',
  'omgili',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/cart/', '/checkout/', '/account/', '/admin/', '/search/'],
      },
      {
        userAgent: BOTS,
        allow: '/',
      },
    ],
    sitemap: 'https://www.cosmicpower.ltd/sitemap.xml',
    host: 'https://www.cosmicpower.ltd',
  }
}