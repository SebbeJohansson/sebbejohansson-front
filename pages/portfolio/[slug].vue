<script setup lang="ts">
const route = useRoute();
let story = {} as any;
const version = route.query._storyblok && route.query._storyblok != '' ? 'draft' : 'published';
await useStoryblok(`portfolio/${route.params.slug}`, { version }).then((response) => {
  story = response.value;
});
const portfolioTitle = computed((): string => story.content?.title || story.name || 'wow');

useHead({
  titleTemplate: title => `${portfolioTitle.value} - ${title}`,
});
</script>

<template>
  <div>
    <component :is="$resolveStoryBlokComponent(story)" :blok="story.content" :raw="story" />
  </div>
</template>
