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
    <content-with-title title="Blog">
      <div class="blog-post-list__content">
        <div class="blog-post-list__list">
          <component
            :is="$resolveStoryBlokComponent(entry)"
            v-for="entry in blogEntries"
            :key="entry.id"
            class="blog-post-list__entry"
            :class="entry.classes"
            :blok="entry.content"
            :raw="entry"
          />
        </div>
      </div>
    </content-with-title>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/foundation/mixins.scss";
.blog-post-list__content {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
}

.blog-post-list__list {
  margin-right: 0.5rem;
  flex-grow: 1;
  max-width: 100%;
}

.blog-post-list__entry {
  padding: 0.5em 0;
  display: block;
}

.blog-post-list__categories {
  margin: 0.5rem 0 0 0.5rem;
  padding: 10px;
  background: #fff;
  border: 1px solid #ddd;
  box-shadow: 0 0 5px #ddd;
  text-decoration: none;
  color: $text-color;
}

.blog-post-list__categories-title {
  margin: 1rem 0;
  font-family: raleway, Helvetica, Arial, Verdana, sans-serif;
  font-weight: 200;
  text-align: center;
}

.blog-post-list__category-line {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
}

.blog-post-list__category-line-box {
  margin-right: 0.5rem;
}

.blog-post-list__category-line-text {
  overflow-wrap: unset;
  white-space: nowrap;
}

@include mixins.for-phone-and-tablet-only() {
  .blog-post-list__content {
    flex-direction: column-reverse;
    align-items: normal;
  }

  .blog-post-list__categories {
    margin: 0;
    width: 100%;
    padding: 10px 4em;
  }

  .blog-post-list__list {
    margin-right: 0;
  }

  .blog-entry__content img {
    width: 100%;
    height: auto;
  }
}
</style>
