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

## Storyblok Visual Editor

Use a Storyblok **preview** token for `STORYBLOK_API_TOKEN` so draft responses include
the `_editable` metadata needed by `v-editable`.

Run `yarn caddy` and set the Visual Editor preview URL to
`https://local.sebbejohansson.com/`. Open the story from Storyblok so it supplies the
`_storyblok` and `_storyblok_tk` query parameters. The preview must use HTTPS to
communicate with the HTTPS Storyblok editor.

Blog and portfolio pages keep published content in their static payloads.
`useStoryblokLivePreview` checks the editor URL after Nuxt hydration with `onNuxtReady`,
fetches the draft, and remounts the block tree because `v-editable` only adds attributes
on mount. It waits for `nextTick` before registering `useStoryblokBridge`.
Checking only during page setup or `onMounted` is too early for prerendered previews.

The Caddy proxy uses port 3000. If a static server already occupies that port,
`yarn caddy` reuses it rather than starting Nuxt: regenerate and restart that server
after source changes, or stop it before starting `yarn caddy` for development.

See Storyblok's [Nuxt Visual Preview guide](https://www.storyblok.com/docs/guides/nuxt/visual-preview).

## Building

```bash
yarn generate     # static build into dist/
```

The nitro preset is pinned to `netlify-static` in `nuxt.config.ts`, so the output
directory is `dist/` both locally and on Netlify, and the build also emits `_headers`
(immutable caching for `/_nuxt/*`) and `_redirects` (`/*` -> `/404.html` 404).

`netlify.toml` publishes `dist/`. If you ever change the preset, change `publish` with
it: Netlify's framework detection otherwise injects `NITRO_PRESET` at build time and
silently moves the output directory, producing a green build that deploys nothing.

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
