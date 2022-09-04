<script setup lang="ts">
import { StoryData } from '@storyblok/vue/dist';

const route = useRoute();

const isPreview = !!(route.query._storyblok && route.query._storyblok !== '');
const version = isPreview ? 'draft' : 'published';

let story = {} as StoryData;

await useStoryblokFetch(`portfolio/${route.params.slug}`, {
  version,
}).then((response) => {
  story = response.story;
});

onMounted(() => {
  if (isPreview) {
    useStoryblokBridge(story.id, evStory => (story = evStory));
  }
});

const portfolioTitle = computed((): string => story.content?.title || story.name || 'Portfolio entry');
const portfolioDescription = computed((): string => story.content?.description || `${story.content?.role} - ${story.content?.title}` || story.name || 'wow');

useHead({
  titleTemplate: title => `${(story.content.role ? `${story.content?.role} at ` : '')}${portfolioTitle.value} - ${title}`,
  meta: [{
    vmid: 'description',
    name: 'description',
    content: portfolioDescription.value,
  }],
});
</script>

<template>
  <div>
    <component :is="$resolveStoryBlokComponent(story)" :blok="story.content" :raw="story" />
  </div>
</template>
