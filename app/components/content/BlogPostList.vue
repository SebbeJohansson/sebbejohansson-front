<script setup lang="ts">
  import type { StoryblokStory } from '#shared/utils/storyblok';

  interface BlogEntry extends StoryblokStory {
    classes: string[];
  }

  const route = useRoute();

  const isPreview = !!(route.query._storyblok && route.query._storyblok !== '');
  const version = isPreview ? 'draft' : 'published';

  const { stories } = await useStoryblokFetch('', {
    starts_with: 'blog/',
    version,
    content_type: 'blog-entry',
    resolve_relations: 'blog-entry.categories',
    sort_by: 'content.date:desc',
  });

  const blogEntries = computed<BlogEntry[]>(() => stories.map(story => ({
    ...story,
    classes: (story.content?.categories ?? []).map(
      (category: { uuid: string }) => `blog-post-list__entry--${category.uuid}`,
    ),
  })));
</script>

<template>
  <div class="blog-post-list">
    <content-with-title title="Blog" plain heading-tag="h1">
      <div class="blog-post-list__list">
        <component
          :is="$resolveStoryBlokComponent(entry)"
          v-for="entry in blogEntries"
          :key="entry.id"
          class="blog-post-list__entry"
          :class="entry.classes"
          :blok="entry.content"
          :raw="entry"
          heading-tag="h2"
        />
      </div>
    </content-with-title>
  </div>
</template>

<style scoped lang="scss">
.blog-post-list__list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
