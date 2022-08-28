import { StoryData } from '@storyblok/vue/dist';

interface Blok {
  story: StoryData;
  cv: number,
}

export const useStoryblokFetch = async (slug: string, version: string) => {
  // const {
  //   //   data: story,
  //   //   pending,
  //   //   error,
  //   //   refresh,
  //   // } = await useAsyncData(
  //   //   `blog-${route.params.slug}`,
  //   //   async () => await useStoryblok(`blog/${route.params.slug}`, { version }),
  //   // );

  const { data: blok } = await useAsyncData(() => $fetch(`https://api.storyblok.com/v2/cdn/stories/${slug}?token=${process.env.STORYBLOK_API_TOKEN}&version=${version}`));
  console.log("storyblok api token is", process.env.STORYBLOK_API_TOKEN);
  console.log("blok in manualstoryblokfetch is", blok.value);
  // const story = computed<StoryData>((): StoryData => {
  //   console.log(blok.value);
  //   return (blok.value as Blok).story;
  // });
  return (blok.value as Blok).story;
}
