// https://socket.dev/npm/package/@funken-studio/sitemap-nuxt-3

import { IncomingMessage, ServerResponse } from 'http'
import { apiPlugin } from '@storyblok/vue'
/**
 * We are using Storyblok as our CMS,
 * in order to have all news and testimonials pages in our sitemap
 * we need to fetch some from Storyblok
 */
export default async (req: IncomingMessage, res: ServerResponse) => {
  if (req.method !== 'POST') {
    res.statusCode = 405
    res.end()
    return
  }

  const config = useRuntimeConfig()
  const { storyblokApi } = apiPlugin({ apiOptions: config.public.storyblok })

  const fetchRoutes = async (slug) => {
    const routes = []
    const pageInfo = await storyblokApi.get(`cdn/stories/?starts_with=${slug}`, {
      version: 'published',
      per_page: 1,
      page: 1,
    })

    const totalPages = Math.ceil(pageInfo.headers.total / 25)
    for (let page = 1; page <= totalPages; page++) {
      const pages = await storyblokApi.get(`cdn/stories/?starts_with=${slug}`, {
        version: 'published',
        page: page,
      })

      for (const page of pages.data.stories) {
        routes.push(`/${slug}/${page.slug}`)
      }
    }
    return routes
  }

  return [...(await fetchRoutes('blog')), ...(await fetchRoutes('portfolio'))]
}
