import { StoryData } from '@storyblok/vue/dist';

interface Blok {
  story: StoryData;
  cv: number,
}

export const useStoryblokFetch = async (slug: string, version: string) => {
  const config = useRuntimeConfig();

  const { data: blok } = await useAsyncData(() => $fetch(`https://api.storyblok.com/v2/cdn/stories/${slug}?token=${config.public.STORYBLOK_API_TOKEN}&version=${version}`));
  return (blok.value as Blok).story;
};
