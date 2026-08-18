import { fetchStoryblokPageRoutes } from './shared/utils/storyblok';

const storyblokApiToken = process.env.STORYBLOK_API_TOKEN ?? '';
const hostname = process.env.HOSTNAME ?? 'https://sebbejohansson.com';

// Static routes that are not backed by Storyblok. `/200.html` and `/404.html`
// are the SPA fallback / not-found documents used by the static host.
const staticPrerenderRoutes = [
  '/',
  '/blog/',
  '/portfolio/',
  '/privacy/',
  '/sitemap.xml',
  '/200.html',
  '/404.html',
];

export default defineNuxtConfig({
  modules: [
    '@storyblok/nuxt',
    'nuxt-jsonld',
    '@nuxt/eslint',
  ],

  app: {
    head: {
      title: 'SebbeJohansson',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: '' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      script: process.env.GTM_ID
        ? [
            {
              key: 'gtm',
              innerHTML: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.GTM_ID}');`,
              type: 'text/javascript',
            },
          ]
        : [],
    },
  },

  css: [
    '~/assets/styles/index.css',
  ],

  runtimeConfig: {
    public: {
      STORYBLOK_API_TOKEN: storyblokApiToken,
      HOSTNAME: hostname,
    },
  },

  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: '2025-08-18',

  nitro: {
    // Pinned explicitly rather than left to Netlify's framework detection. Detection
    // injects NITRO_PRESET at build time, which moves the output directory out from
    // under netlify.toml's `publish` and produced a green build that deployed nothing.
    // Setting it here keeps a local `yarn generate` byte-identical to the deploy, and
    // the preset also emits _headers (immutable caching for /_nuxt/*) and
    // _redirects (/* -> /404.html 404) that the plain `static` preset does not.
    preset: 'netlify-static',

    prerender: {
      // Link crawling is deliberately off: editorial content in Storyblok can contain
      // broken or unrendered links (e.g. a literal `{{ revealButtonHref }}` href, or a
      // slug with the wrong casing), and a crawled dead link fails the whole build.
      // The route list is derived from Storyblok instead, so it only ever contains
      // routes that are known to exist.
      crawlLinks: false,
      failOnError: true,
      routes: staticPrerenderRoutes,
      // Storyblok rate-limits its CDN API, and every prerendered page hits it at least
      // once. Keep the request rate low enough that the retries in shared/utils/storyblok
      // stay a safety net rather than the normal path.
      concurrency: 3,
      interval: 150,
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/foundation/global-vars" as *;',
        },
      },
    },
  },

  postcss: {
    plugins: {
      'postcss-import': {},
      autoprefixer: {
        overrideBrowserslist: ['last 2 versions', 'Firefox ESR', '> 1%', 'iOS >= 12', 'Android >= 6'],
      },
    },
  },
  telemetry: false,

  hooks: {
    // Runs only when routes are actually being prerendered, so `nuxt prepare`/`nuxt dev`
    // never touch the Storyblok API. A failure here fails the build on purpose: shipping
    // a static site that is silently missing every blog post is worse than not shipping.
    async 'prerender:routes'({ routes }) {
      if (!storyblokApiToken) {
        console.warn('[prerender] STORYBLOK_API_TOKEN is not set — skipping Storyblok routes.');
        return;
      }
      const storyblokRoutes = await fetchStoryblokPageRoutes(storyblokApiToken);
      console.info(`[prerender] Adding ${storyblokRoutes.length} Storyblok routes.`);
      storyblokRoutes.forEach(route => routes.add(route));
    },
  },

  eslint: {
    config: {
      stylistic: {
        indent: 2,
        semi: true,
        quotes: 'single',
        commaDangle: 'always-multiline',
      },
    },
  },

  storyblok: {
    accessToken: storyblokApiToken,
    componentsDir: '~/storyblok',
  },
});
