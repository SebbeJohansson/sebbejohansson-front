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
    async () => {
      let pages = 0;
      const stories: StoryData[] = [];

      await $fetch.raw(`https://api.storyblok.com/v2/cdn/stories/${slug}?token=${config.public.STORYBLOK_API_TOKEN}&${new URLSearchParams(params)}`).then((res) => {
        console.log(res._data);
        if (!res._data) { return; }
        console.log('Had data');
        if (res._data.story) {
          console.log('Had story');
          stories.push(res._data.story);
        } else {
          const total = res.headers.get('total');
          const perPage = res.headers.get('per_page') || total > 25 ? 25 : null;

          if (perPage) {
            pages = Math.ceil(total / perPage);
          }

          stories.push(...(res._data.stories as StoryData[]));
        }
      });

      for (let page = 2; page <= pages; page += 1) {
        await $fetch(`https://api.storyblok.com/v2/cdn/stories/${slug}?token=${config.public.STORYBLOK_API_TOKEN}&${new URLSearchParams({ ...params, page })}`).then((res) => {
          stories.push(...(res.stories as StoryData[]));
        });
      }

      console.log('returning stories', {
        stories,
        story: stories[0],
      });

      return {
        stories,
        story: stories[0],
      };
    },
  );
  const blok = result.value as Blok;
  console.log("returning result", result.value);
  return blok;
};
