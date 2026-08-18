<script setup lang="ts">
  import { type ISbStoryData } from '@storyblok/vue';

  const route = useRoute();

  const isPreview = !!(route.query._storyblok && route.query._storyblok !== '');
  const version = isPreview ? 'draft' : 'published';

  const story = ref({} as ISbStoryData);

  if (isPreview) {
    // We are in preview so lets fetch it with the normal module.
    const storyblokApi = useStoryblokApi();
    await storyblokApi.get(`cdn/stories/portfolio/${route.params.slug}`, {
      version,
    }).then((response) => {
      if (!response) { return; }
      story.value = response.data.story;
    });

    onMounted(() => {
      const { StoryblokBridge } = window;
      const storyblokInstance = new StoryblokBridge();
      storyblokInstance.on(['published', 'change', 'input'], (event) => {
        story.value = event.story;
      });
    });
  } else {
    // Custom fetch for full static support.
    await useStoryblokFetch(`portfolio/${route.params.slug}`, {
      version,
    }).then((response) => {
      if (!response) { return; }
      story.value = response.story;
    });
  }

  const portfolioTitle = computed((): string => story.value.content?.title || story.value.name || 'Portfolio entry');
  const portfolioDescription = computed((): string => story.value.content?.description || `${story.value.content?.role} - ${story.value.content?.title}` || story.value.name || 'wow');

  useHead({
    titleTemplate: title => `${(story.value.content?.role ? `${story.value.content?.role} at ` : '')}${portfolioTitle.value} - ${title}`,
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
