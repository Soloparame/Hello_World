/**
 * Fills absolute SEO URLs (canonical / Open Graph / Twitter / JSON-LD)
 * using VITE_SITE_URL when set, otherwise the current origin.
 */
export function applySeoAbsoluteUrls() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return

  const configured = (import.meta.env.VITE_SITE_URL as string | undefined)?.replace(/\/$/, '')
  const origin = configured || window.location.origin
  const pageUrl = `${origin}${window.location.pathname === '/' ? '/' : window.location.pathname}`
  const imageUrl = `${origin}/logo512.png`

  const setAttr = (id: string, attr: string, value: string) => {
    const el = document.getElementById(id)
    if (el) el.setAttribute(attr, value)
  }

  setAttr('seo-canonical', 'href', pageUrl)
  setAttr('seo-og-url', 'content', pageUrl)
  setAttr('seo-og-image', 'content', imageUrl)
  setAttr('seo-twitter-image', 'content', imageUrl)

  document.querySelectorAll('script[type="application/ld+json"]').forEach((node) => {
    try {
      const data = JSON.parse(node.textContent || '{}') as {
        '@graph'?: Array<Record<string, unknown>>
      }
      if (!Array.isArray(data['@graph'])) return

      data['@graph'] = data['@graph'].map((item) => {
        const next = { ...item }
        if (typeof next.url === 'string' && next.url.startsWith('/')) {
          next.url = `${origin}${next.url === '/' ? '/' : next.url}`
        }
        if (typeof next['@id'] === 'string' && next['@id'].startsWith('/')) {
          next['@id'] = `${origin}${next['@id']}`
        }
        if (next.logo && typeof next.logo === 'object') {
          const logo = next.logo as Record<string, unknown>
          if (typeof logo.url === 'string' && logo.url.startsWith('/')) {
            logo.url = `${origin}${logo.url}`
          }
        }
        if (typeof next.image === 'string' && next.image.startsWith('/')) {
          next.image = `${origin}${next.image}`
        }
        if (next.publisher && typeof next.publisher === 'object') {
          const publisher = next.publisher as Record<string, unknown>
          if (typeof publisher['@id'] === 'string' && publisher['@id'].startsWith('/#')) {
            publisher['@id'] = `${origin}${publisher['@id']}`
          }
        }
        return next
      })

      node.textContent = JSON.stringify(data)
    } catch {
      // Leave original JSON-LD untouched if parsing fails
    }
  })
}
