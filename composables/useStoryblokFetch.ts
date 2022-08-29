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
        // console.log(res);
        if (res._data.story) {
          stories.push(res._data.story);
        } else {
          // console.log('length of sotries array: ', res._data.stories.length);
          console.log(res.headers.get('per_page'));
          console.log(res.headers.get('total'));
          const total = res.headers.get('total');
          const perPage = res.headers.get('per_page') || total > 25 ? 25 : null;

          console.log("per page", perPage);

          if (perPage) {
            pages = Math.ceil(total / perPage);
          }
          console.log("total pages", pages);

          stories.push(...(res._data.stories as StoryData[]));
        }
      });
      // console.log(pages);

      for (let page = 2; page <= pages; page += 1) {
        console.log("loop", `https://api.storyblok.com/v2/cdn/stories/${slug}?token=${config.public.STORYBLOK_API_TOKEN}&${new URLSearchParams({ ...params, page })}`);
        await $fetch(`https://api.storyblok.com/v2/cdn/stories/${slug}?token=${config.public.STORYBLOK_API_TOKEN}&${new URLSearchParams({ ...params, page })}`).then((res) => {
          console.log(res.stories);

          stories.push(...(res.stories as StoryData[]));
        });
      }
      console.log('stories are', stories.length);
      // return $fetch(`https://api.storyblok.com/v2/cdn/stories/${slug}?token=${config.public.STORYBLOK_API_TOKEN}&${new URLSearchParams(params)}`);
      return {
        stories,
        story: stories[0],
      };
    },
  );
  const blok = result.value as Blok;
  return blok;
};
