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

const PRIVATE_PATHS = ['/cart', '/checkout', '/account', '/admin', '/search', '/track', '/api/']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: BOTS,
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
    ],
    sitemap: 'https://www.cosmicpower.ltd/sitemap.xml',
    host: 'https://www.cosmicpower.ltd',
  }
}
