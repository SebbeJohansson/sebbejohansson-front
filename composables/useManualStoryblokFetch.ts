import { StoryData } from '@storyblok/vue/dist';

interface Blok {
  story: StoryData;
  cv: number,
}

export const useManualStoryblokFetch = (slug: string) => {
  const route = useRoute();

  const version = route.query._storyblok && route.query._storyblok !== ''
    ? 'draft'
    : 'published';
  const { data: blok } = useAsyncData(() => $fetch(`https://api.storyblok.com/v2/cdn/stories/${slug}?token=ee04k73GERZuvgzbdMDHqQtt&version=${version}`));
  console.log(blok);
  const story = computed<StoryData>((): StoryData => {
    console.log(blok.value);
    return (blok.value as Blok).story;
  }) || {};
  return story;
}
