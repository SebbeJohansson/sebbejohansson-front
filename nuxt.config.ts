export default defineNuxtConfig({
  telemetry: false,

  // Disable servenr-side rendering: https://go.nuxtjs.dev/ssr-mode
  // ssr: false,

  runtimeConfig: {
    public: {
      STORYBLOK_API_TOKEN: process.env.STORYBLOK_API_TOKEN,
    },
  },

  app: {
    head: {
      title: 'SebbeJohansson',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],
      script: [
        {
          hid: 'gtm',
          children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.GTM_ID}');`,
          type: 'text/javascript',
        },
      ],
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/index.css',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@storyblok/nuxt',
    'nuxt-jsonld',
  ],

  storyblok: {
    accessToken: process.env.STORYBLOK_API_TOKEN,
  },

  postcss: {
    plugins: {
      'postcss-import': {},
      autoprefixer: {
        overrideBrowserslist: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
      },
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/styles/global-vars" as *;',
        },
      },
    },
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/', '/404.html', '/200.html'],
    },
  },
});
