
<script setup lang="ts">
const route = useRoute()
let story = {} as any;
const version = route.query._storyblok && route.query._storyblok != "" ? "draft" : "published";
await useStoryblok(`blog/${route.params.slug}`, { version: version }).then((response) => {
  story = response.value;
});
const blogTitle = computed((): string => {
  return story.content?.title || story.name || 'wow'
});

useHead({
  titleTemplate: (title) => `${blogTitle.value} - ${title}`,
});
</script>

<template>
  <div class="page blog-entry-page">
    <StoryblokComponent :blok="story.content" :raw="story" />
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
