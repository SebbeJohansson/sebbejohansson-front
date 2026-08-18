<script setup lang="ts">
  import type { StoryblokStory } from '#shared/utils/storyblok';

  const route = useRoute();

  const isPreview = !!(route.query._storyblok && route.query._storyblok !== '');
  const version = isPreview ? 'draft' : 'published';

  const story = ref<StoryblokStory | undefined>();

  if (isPreview) {
    // We are in preview so lets fetch it with the normal module.
    const storyblokApi = useStoryblokApi();
    const response = await storyblokApi.get(`cdn/stories/portfolio/${route.params.slug}`, {
      version,
    });
    story.value = response?.data?.story;

    onMounted(() => {
      const { StoryblokBridge } = window;
      const storyblokInstance = new StoryblokBridge();
      storyblokInstance.on(['published', 'change', 'input'], (event) => {
        if (event?.story) { story.value = event.story; }
      });
    });
  }
  else {
    // Custom fetch for full static support.
    const response = await useStoryblokFetch(`portfolio/${route.params.slug}`, {
      version,
    });
    story.value = response.story;
  }

  if (!story.value) {
    throw createError({ statusCode: 404, statusMessage: 'Portfolio entry not found', fatal: true });
  }

  const portfolioTitle = computed((): string => story.value?.content?.title || story.value?.name || 'Portfolio entry');
  const portfolioRole = computed((): string => story.value?.content?.role || '');
  const portfolioDescription = computed((): string => story.value?.content?.description
    || (portfolioRole.value ? `${portfolioRole.value} - ${portfolioTitle.value}` : portfolioTitle.value));

  useHead({
    titleTemplate: title => `${portfolioRole.value ? `${portfolioRole.value} at ` : ''}${portfolioTitle.value} - ${title}`,
    meta: [{
      name: 'description',
      content: portfolioDescription.value,
    }],
  });
</script>

<template>
  <div class="page portfolio-entry-page">
    <component
      :is="$resolveStoryBlokComponent(story)"
      v-if="story?.content"
      :blok="story.content"
      :raw="story"
    />
  </div>
</template>
