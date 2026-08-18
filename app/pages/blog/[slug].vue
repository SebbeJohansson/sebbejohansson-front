<script setup lang="ts">
  import { type ISbStoryData } from '@storyblok/vue';

  const route = useRoute();

  const isPreview = !!(route.query._storyblok && route.query._storyblok !== '');
  const version = isPreview ? 'draft' : 'published';

  const story = ref({} as ISbStoryData);

  if (isPreview) {
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
@use "@/assets/styles/foundation/mixins.scss";
.blog-entry-page {
  @include mixins.content-width();
  padding: 1rem;
}
</style>
