<script setup lang="ts">
import { StoryData } from '@storyblok/vue/dist';

interface Blok {
  story: StoryData;
  cv: number,
}

// const {
//   data: story,
//   pending,
//   error,
//   refresh,
// } = await useAsyncData(
//   `blog-${route.params.slug}`,
//   async () => await useStoryblok(`blog/${route.params.slug}`, { version }),
// );

// Change so that it uses storyblokApi.get() instead of fetch since that will still give the correct return type.
// const { data: blok, pending, refresh } = useAsyncData(() => $fetch('https://api.storyblok.com/v2/cdn/stories/blog/'+route.params.slug+'?token=ee04k73GERZuvgzbdMDHqQtt&version='+version));
// console.log(blok.value);

// const { data: blok } = await useAsyncData(() => $fetch(`https://api.storyblok.com/v2/cdn/stories/${route.params.slug}?token=ee04k73GERZuvgzbdMDHqQtt&version=${version}`));
// console.log(blok);

// const { data } = useAsyncData(() => $fetch('https://my.api.com/data'));
// console.log('https://api.storyblok.com/v2/cdn/stories/blog/'+route.params.slug);
// console.log(route.params.slug);
// const { data } = useAsyncData(() => $fetch('https://api.storyblok.com/v2/cdn/stories/blog/'+route.params.slug+'?token=ee04k73GERZuvgzbdMDHqQtt&version='+version));
// console.log(data);

// const story = computed<StoryData>((): StoryData => {
//   console.log(blok.value);
//   return (blok.value as Blok).story;
// }) || {};

const route = useRoute();
const story = await useManualStoryblokFetch(`blog/${route.params.slug}`);

// const story = computed<StoryData>((): StoryData =>
// //   console.log(blok.value);
//   (blok.value as Blok).story) || {};
const portfolioTitle = computed((): string => 'wow');
// console.log(portfolioTitle);
// console.log(story);

</script>

<template>
  <div class="page blog-entry-page">
    {{ portfolioTitle }}
    {{ story }}
    <StoryblokComponent
      :blok="story.content"
      :raw="story"
    />
  </div>
</template>

<style scoped>
.blog-entry-page {
  width: 100%;
  max-width: 1300px;
  margin: 10px auto;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
