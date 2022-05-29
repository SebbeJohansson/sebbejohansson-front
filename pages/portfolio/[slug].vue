
<script setup lang="ts">
const route = useRoute()
let story = {} as any;
await useStoryblok(`portfolio/${route.params.slug}`, { version: "published" }).then((response) => {
  story = response.value;
});
const title2 = computed((): string => {
  return story.content?.title || story.name || 'wow'
});

useHead({
  titleTemplate: (title) => `${title2.value} - ${title}`,
});
</script>

<template>
  <div>
    <StoryblokComponent :blok="story.content" :rawBlog="story" />
  </div>
</template>
