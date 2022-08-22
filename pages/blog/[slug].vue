<script setup lang="ts">
const route = useRoute();

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

const { data: blok, pending, refresh } = await useAsyncData(() => $fetch(`https://api.storyblok.com/v2/cdn/stories/blog/${route.params.slug}?token=ee04k73GERZuvgzbdMDHqQtt&version=published`));

</script>

<template>
  <div class="page blog-entry-page">
    <StoryblokComponent
      :blok="blok.story.content"
      :raw="blok.story"
    />
    <component
      :is="$resolveStoryBlokComponent(blok.story)"
      v-if="blok.story.content"
      :blok="blok.story.content"
      :raw="blok.story"
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
