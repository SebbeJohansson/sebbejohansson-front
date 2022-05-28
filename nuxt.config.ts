import { defineNuxtConfig } from "nuxt";

export default defineNuxtConfig({
  telemetry: false,

  // Disable servenr-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  router: {
    trailingSlash: true
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
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
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/styles/index',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/media-handler.ts",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/gtm',
    "@storyblok/nuxt",
  ],

  gtm: {
    id: 'GTM-KLS6G4B'
  },

  storyblok: {
    accessToken: process.env.STORYBLOK_API_TOKEN
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, {isDev, isClient}) {
      config.resolve.extensions.push(".ts", ".tsx", ".js");

      config.module.rules.push(
        {
          test: /\.(svg|woff|woff2|eot|ttf)$/,
          loader: 'file-loader',
        }
      );
    },
    postcss: {
      plugins: {
        'postcss-import': {},
        'postcss-css-variables': {
          variables: {
          },
          preserveAtRulesOrder: true,
          preserve: true,
        },
        'postcss-custom-media': {
          importFrom: [
            {
              customMedia: {
                '--phone': '(max-width: 767px)',
                '--phoneAndTablet': '(max-width: 1023px)',
                '--tablet': '(min-width: 768px) and (max-width: 1023px)',
                '--tabletAndDesktop': '(min-width: 768px)',
                '--desktop': '(min-width: 1024px)',
              },
            },
          ],
        },
        'postcss-preset-env': { },
        cssnano: { },
        'autoprefixer': {
          overrideBrowserslist: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4']
        },
      },
      preset: {
      },
    }
  },
  env: {
    apiUrl: process.env.API_URL || 'http://localhost/api'
  },
  generate: {
    async routes() {
      interface PortfolioEntry {
        title: string;
        description: string;
        slug: string;
        entryPic: string;
        link: string;
        size: number;
      }
      const data = [
        "fields slug,entryPic,title,description,size,link;",
        "filter status=1;",
        "sort orderID asc;",
      ];

      const portfolioEntries = await axios
        .post(process.env.API_URL+"/portfolios/get", data.join(""))
        .then((response) => {
          const entries = response.data as PortfolioEntry[];
          return entries;
        })
        .catch((error) => {
          console.log(error.response);
        }) as PortfolioEntry[];


      return [
        ...portfolioEntries.map((entry) => {
          return {
            route: '/portfolio/' + entry.slug + "/",
            payload: entry,
          }
        }),
      ];
    },
  }
});
