<script setup lang="ts">
  import { StoryData } from '@storyblok/vue/dist';

  const route = useRoute();

  const isPreview = !!(route.query._storyblok && route.query._storyblok !== '');
  const version = isPreview ? 'draft' : 'published';

  const story = ref({} as StoryData);

  if (isPreview) {
    // We are in preview so lets fetch it with the normal module.
    await useStoryblok(`blog/${route.params.slug}`, {
      version,
      resolve_relations: 'blog-entry.categories',
    }).then((response) => {
      if (!response) { return; }
      story.value = response.value;
    });
    // We are in preview so lets fetch it with the normal module.
    const storyblokApi = useStoryblokApi();
    await storyblokApi.get(`cdn/stories/blog/${route.params.slug}`, {
      version,
      resolve_relations: 'blog-entry.categories',
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
    await useStoryblokFetch(`blog/${route.params.slug}`, {
      version,
      resolve_relations: 'blog-entry.categories',
    }).then((response) => {
      if (!response) { return; }
      story.value = response.story;
    });
  }

  const blogPostTitle = computed((): string => story.value.content?.title || story.value.name || 'wow');

  useHead({
    titleTemplate: title => `${blogPostTitle.value} - Blog - ${title}`,
    meta: [{
      vmid: 'description',
      name: 'description',
      content: `Blog post about ${blogPostTitle.value}`,
    }],
  });

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

<style scoped lang="scss">
.blog-entry-page {
  width: 100%;
  max-width: 1300px;
  margin: 10px auto;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
