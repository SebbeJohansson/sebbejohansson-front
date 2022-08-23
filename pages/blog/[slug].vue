<script setup lang="ts">
import { StoryData } from '@storyblok/vue/dist';
const route = useRoute();

interface Blok {
  story: StoryData;
  cv: number,
}

const version = route.query._storyblok && route.query._storyblok != ''
  ? 'draft'
  : 'published';

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
const { data: blok, pending, refresh } = await useAsyncData(() => $fetch(`https://api.storyblok.com/v2/cdn/stories/blog/${route.params.slug}?token=ee04k73GERZuvgzbdMDHqQtt&version=${version}`));
console.log(blok.value);

const story = computed((): StoryData => (blok.value as Blok).story);
console.log(story);

</script>

<template>
  <div class="page blog-entry-page">
    {{story}}
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
