import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  telemetry: false,

  // Disable servenr-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  generate: {
    crawler: true,
  },

  app: {
    head: {
      title: 'SebbeJohansson',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: '' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
      ],
      script: [
        {
          hid: 'gtm',
          children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.GTM_ID}');`,
          type: 'text/javascript'
        }
      ],
    }
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/styles/index.css',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    //'@nuxtjs/axios',
    '@storyblok/nuxt',
  ],

  storyblok: {
    accessToken: process.env.STORYBLOK_API_TOKEN
  },

  postcss: {
    plugins: {
      'postcss-import': {},
      'postcss-custom-media': {
        importFrom: [
          {
            customMedia: {
              '--phone': '(max-width: 767px)',
              '--phoneAndTablet': '(max-width: 1023px)',
              '--tablet': '(min-width: 768px) and (max-width: 1023px)',
              '--tabletAndDesktop': '(min-width: 768px)',
              '--desktop': '(min-width: 1024px)'
            }
          }
        ]
      },
      autoprefixer: {
        overrideBrowserslist: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
      }
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['@marvr/storyblok-rich-text-vue-renderer'],
  },
})
