export default defineEventHandler(async (event) => {
  const runtimeConfig = useRuntimeConfig(event);
  const routes = await fetchStoryblokPageRoutes(runtimeConfig.public.STORYBLOK_API_TOKEN);
  const staticRoutes = ['/', '/blog/', '/portfolio/', '/privacy/'];
  const timestamp = new Date().toISOString();
  const hostname = (runtimeConfig.public.HOSTNAME || '').replace(/\/$/, '');

  const uniqueRoutes = [...new Set([...staticRoutes, ...routes])].sort();

  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...uniqueRoutes.map(route => [
      '<url>',
      `<loc>${hostname}${route}</loc>`,
      `<lastmod>${timestamp}</lastmod>`,
      '</url>',
    ].join('')),
    '</urlset>',
  ].join('');

  setHeader(event, 'content-type', 'application/xml');
  return sitemap;
});
