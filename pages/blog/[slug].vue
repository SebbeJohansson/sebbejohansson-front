<script setup lang="ts">
import { StoryData } from '@storyblok/vue/dist';

const route = useRoute();

const isPreview = !!(route.query._storyblok && route.query._storyblok !== '');
const version = isPreview ? 'draft' : 'published';

let story = {} as StoryData;

if (isPreview) {
  // We are in preview so lets fetch it with the normal module.
  await useStoryblok(`blog/${route.params.slug}`, {
    version,
  }).then((response) => {
    if (!response) { return; }
    story = response.value;
  });
} else {
  // Custom fetch for full static support.
  await useStoryblokFetch(`blog/${route.params.slug}`, {
    version,
  }).then((response) => {
    if (!response) { return; }
    story = response.story;
  });
}

// Disabled until we know if we can use useStoryblokFetch for preview.
/* onMounted(() => {
  if (isPreview) {
    useStoryblokBridge(story.id, evStory => (story = evStory));
  }
}); */

</script>

<template>
  <div class="page blog-entry-page">
    <component
      :is="$resolveStoryBlokComponent(story)"
      v-if="story.content"
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
