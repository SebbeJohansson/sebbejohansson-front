# SebbeJohansson Front

Personal site built with [Nuxt 4](https://nuxt.com) and [Storyblok](https://www.storyblok.com/),
deployed as a fully prerendered static site.

## Requirements

- Node `^22.19.0 || ^24.11.0 || >=26`
- Yarn (classic)

## Setup

```bash
yarn install
```

Copy `.envexample` to `.env` and fill it in:

| Variable               | Purpose                                                     |
| ---------------------- | ----------------------------------------------------------- |
| `STORYBLOK_API_TOKEN`  | Storyblok content delivery token (public, shipped to client) |
| `HOSTNAME`             | Absolute site URL, used for `sitemap.xml`                    |
| `GTM_ID`               | Google Tag Manager container id (optional)                   |

## Development

```bash
yarn dev          # dev server on http://localhost:3000
yarn lint         # eslint (flat config via @nuxt/eslint)
yarn typecheck    # vue-tsc
```

## Building

```bash
yarn generate     # static build into .output/public
```

## Project structure

Follows the Nuxt 4 layout:

```
app/          # Vue application (pages, layouts, components, composables, plugins, assets)
app/storyblok # Storyblok bloks, auto-registered by @storyblok/nuxt
shared/       # code auto-imported into both the app and the server (Storyblok fetching)
server/       # nitro routes (sitemap.xml)
public/       # static assets copied verbatim
```

## Prerendering

The site is prerendered by Nitro. Link crawling is **off** on purpose — the route list is
derived from Storyblok in the `prerender:routes` hook in `nuxt.config.ts`, so only routes
that actually exist are rendered.

Crawling used to fail the build whenever editorial content contained a dead link, e.g. a
GitHub gist embed carrying a literal `{{ revealButtonHref }}` href, or a portfolio link
with the wrong slug casing (`/portfolio/Fall-Flappy-Fall` vs `fall-flappy-fall`).
Those links now simply resolve to the 404 page at runtime instead of breaking the deploy.

Prerender concurrency is throttled and every Storyblok request retries `429`/`5xx`
responses with exponential backoff, because Storyblok rate-limits its CDN API.
