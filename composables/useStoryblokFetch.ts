import { StoryData } from '@storyblok/vue/dist';

interface Blok {
  story: StoryData;
  stories: StoryData[];
  cv: number,
}

export const useStoryblokFetch = async (slug: string, params?: any) => {
  const config = useRuntimeConfig();

  const { data: result } = await useAsyncData(
    `${slug}-${new URLSearchParams(params)}`,
    () => {
      console.log(`https://api.storyblok.com/v2/cdn/stories/${slug}?token=${config.public.STORYBLOK_API_TOKEN}&${new URLSearchParams(params)}`);
      return $fetch(`https://api.storyblok.com/v2/cdn/stories/${slug}?token=${config.public.STORYBLOK_API_TOKEN}&${new URLSearchParams(params)}`);
    },
  );
  // console.log('blok in manualstoryblokfetch is', result.value);
  const blok = result.value as Blok;
  // console.log(blok);
  return blok;
  // if (blok.stories) {
  //   return result.value.stories as Blok[];
  // }
  // const story = computed<StoryData>((): StoryData => {
  //   console.log(blok.value);
  //   return (blok.value as Blok).story;
  // });
  // return (blok.value as Blok).story;
};
