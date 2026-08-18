import { ofetch } from 'ofetch';

const STORYBLOK_CDN = 'https://api.storyblok.com/v2/cdn/stories';

/** Sections of the site that are backed by a `pages/<section>/[slug].vue` route. */
export const STORYBLOK_ROUTED_SECTIONS = ['blog', 'portfolio'] as const;

export interface StoryblokStory {
  id: number;
  uuid: string;
  name: string;
  slug: string;
  full_slug: string;
  path?: string | null;
  content: Record<string, any>;
  [key: string]: any;
}

export interface StoryblokStoriesResult {
  stories: StoryblokStory[];
  story: StoryblokStory | undefined;
}

type StoryblokParams = Record<string, string | number | boolean | undefined>;

function buildQuery(token: string, params: StoryblokParams = {}) {
  const query: Record<string, string> = { token };
  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') { return; }
    query[key] = String(value);
  });
  return query;
}

// Storyblok rate-limits the CDN API. Prerendering fires a lot of requests in a short
// window, so every call retries a 429/5xx with an exponential backoff before giving up.
const RETRY_STATUS_CODES = [408, 409, 425, 429, 500, 502, 503, 504];
const MAX_RETRIES = 6;

function backoffDelay(attempt: number) {
  return Math.min(2 ** attempt * 250, 8000);
}

function statusOf(error: any): number | undefined {
  return error?.status ?? error?.statusCode ?? error?.response?.status;
}

async function storyblokRequest(slug: string, query: Record<string, string>) {
  return ofetch.raw<{ story?: StoryblokStory; stories?: StoryblokStory[] }>(
    `${STORYBLOK_CDN}/${slug}`,
    {
      query,
      retry: MAX_RETRIES,
      retryDelay: ({ options }) => backoffDelay(MAX_RETRIES - ((options.retry as number) ?? 0)),
      retryStatusCodes: RETRY_STATUS_CODES,
    },
  );
}

/**
 * Fetches a single story, or every page of a story list, from the Storyblok CDN.
 * Returns `story: undefined` when the requested story does not exist (404) instead of
 * throwing, so a missing or wrongly cased slug renders a 404 page rather than crashing.
 */
export async function fetchStoryblokStories(
  token: string,
  slug = '',
  params: StoryblokParams = {},
): Promise<StoryblokStoriesResult> {
  const stories: StoryblokStory[] = [];

  const firstPage = await storyblokRequest(slug, buildQuery(token, params)).catch((error) => {
    if (statusOf(error) === 404) { return null; }
    throw new Error(`Storyblok request for "${slug}" failed`, { cause: error });
  });

  if (!firstPage?._data) {
    return { stories, story: undefined };
  }

  if (firstPage._data.story) {
    stories.push(firstPage._data.story);
    return { stories, story: stories[0] };
  }

  stories.push(...(firstPage._data.stories ?? []));

  const total = Number(firstPage.headers.get('total') ?? stories.length);
  const perPage = Number(firstPage.headers.get('per-page') ?? 25) || 25;
  const pages = Math.ceil(total / perPage);

  for (let page = 2; page <= pages; page += 1) {
    // Storyblok caps the page size, so the remaining pages have to be walked in order.

    const next = await storyblokRequest(slug, buildQuery(token, { ...params, page }));
    stories.push(...(next._data?.stories ?? []));
  }

  return { stories, story: stories[0] };
}

/** Normalises a story into a site path with a leading and trailing slash. */
export function storyToPath(story: StoryblokStory): string {
  const raw = story.path || (story.full_slug ? `/${story.full_slug}` : `/${story.slug}`);
  const withLeading = raw.startsWith('/') ? raw : `/${raw}`;
  return withLeading.endsWith('/') ? withLeading : `${withLeading}/`;
}

/**
 * The subset of published stories that actually resolve to a page component.
 * Anything else (contact entries, folders, nested paths) would 404 during prerendering.
 */
export async function fetchStoryblokPageRoutes(token: string): Promise<string[]> {
  const { stories } = await fetchStoryblokStories(token, '', { version: 'published' });
  return stories
    .map(storyToPath)
    .filter((path) => {
      const segments = path.split('/').filter(Boolean);
      return segments.length === 2 && (STORYBLOK_ROUTED_SECTIONS as readonly string[]).includes(segments[0] ?? '');
    })
    .sort();
}
