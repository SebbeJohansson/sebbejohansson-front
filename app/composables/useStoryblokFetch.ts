import type { StoryblokStory } from '#shared/utils/storyblok';

export interface StoryblokFetchResult {
  stories: StoryblokStory[];
  story: StoryblokStory | undefined;
}

/**
 * Fetches Storyblok content through `useAsyncData` so the result is serialised into the
 * prerendered payload and no request is made again on the client.
 *
 * A missing story resolves to `story: undefined` rather than throwing — callers decide
 * whether that is a 404 or simply an empty list.
 */
export async function useStoryblokFetch(
  slug: string,
  params: Record<string, string | number | boolean | undefined> = {},
): Promise<StoryblokFetchResult> {
  const config = useRuntimeConfig();
  const key = `storyblok:${slug}:${new URLSearchParams(
    Object.entries(params).map(([k, v]) => [k, String(v ?? '')]),
  ).toString()}`;

  const { data, error } = await useAsyncData(
    key,
    () => fetchStoryblokStories(config.public.STORYBLOK_API_TOKEN, slug, params),
    { default: (): StoryblokFetchResult => ({ stories: [], story: undefined }) },
  );

  // A transport/auth failure must not be silently prerendered as an empty page.
  if (error.value) {
    throw createError({
      statusCode: 502,
      statusMessage: `Storyblok request failed for "${slug}"`,
      cause: error.value,
      fatal: true,
    });
  }

  return data.value as StoryblokFetchResult;
}
