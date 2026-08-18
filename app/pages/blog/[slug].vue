<script setup lang="ts">
  import type { StoryblokStory } from '#shared/utils/storyblok';

  const route = useRoute();

  const isPreview = !!(route.query._storyblok && route.query._storyblok !== '');
  const version = isPreview ? 'draft' : 'published';

  const story = ref<StoryblokStory | undefined>();

  if (isPreview) {
    // We are in preview so lets fetch it with the normal module.
    const storyblokApi = useStoryblokApi();
    const response = await storyblokApi.get(`cdn/stories/blog/${route.params.slug}`, {
      version,
      resolve_relations: 'blog-entry.categories',
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
    const response = await useStoryblokFetch(`blog/${route.params.slug}`, {
      version,
      resolve_relations: 'blog-entry.categories',
    });
    story.value = response.story;
  }

  if (!story.value) {
    throw createError({ statusCode: 404, statusMessage: 'Blog post not found', fatal: true });
  }

  const blogPostTitle = computed((): string => story.value?.content?.title || story.value?.name || 'wow');

  useHead({
    titleTemplate: title => `${blogPostTitle.value} - Blog - ${title}`,
    meta: [{
      name: 'description',
      content: `Blog post about ${blogPostTitle.value}`,
    }],
  });
</script>

<template>
  <div class="page blog-entry-page">
    <component
      :is="$resolveStoryBlokComponent(story)"
      v-if="story?.content"
      :blok="story.content"
      :raw="story"
    />
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/foundation/mixins.scss";

.blog-entry-page {
  @include mixins.content-width();

  padding: 1rem;
}
</style>
