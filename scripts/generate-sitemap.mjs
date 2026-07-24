/**
 * Builds sitemap.xml with absolute URLs at build time when VITE_SITE_URL is set.
 * Netlify/Google need absolute locs — run this during build if env is present.
 */
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const site = (process.env.VITE_SITE_URL || '').replace(/\/$/, '')

if (!site) {
  console.warn(
    '[seo] VITE_SITE_URL is not set — sitemap.xml keeps relative paths. Set VITE_SITE_URL=https://your-domain.com for best SEO.',
  )
  process.exit(0)
}

const paths = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/projects', priority: '0.9', changefreq: 'weekly' },
  { path: '/team', priority: '0.8', changefreq: 'monthly' },
  { path: '/hosting', priority: '0.8', changefreq: 'monthly' },
]

const body = paths
  .map(
    (item) => `  <url>
    <loc>${site}${item.path === '/' ? '/' : item.path}</loc>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`,
  )
  .join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`

writeFileSync(resolve('public/sitemap.xml'), xml)
console.log(`[seo] Wrote absolute sitemap for ${site}`)
