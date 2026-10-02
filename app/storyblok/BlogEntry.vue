<script setup lang="ts">
  // h1 on the post page, h2 when listed under the blog page title.
  const props = withDefaults(defineProps<{ blok: Record<string, any>; raw?: Record<string, any>; headingTag?: 'h1' | 'h2' }>(), {
    raw: undefined,
    headingTag: 'h1',
  });

  const title = computed((): string => props.blok.title || props.raw?.name);
  const slug = computed((): string => `/blog/${props.blok.slug || props.raw?.slug}/`);
  const date = computed((): string | undefined => props.blok.date || undefined);
  const isPage = computed((): boolean => props.headingTag === 'h1');

  // Storyblok stores "YYYY-MM-DD HH:mm". Built from the parts so SSR and client agree regardless of timezone.
  const formattedDate = computed((): string | undefined => {
    const [year, month, day] = (date.value?.split(' ')[0] ?? '').split('-').map(Number);
    if (!year || !month || !day) { return date.value; }
    return new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
      .format(new Date(Date.UTC(year, month - 1, day)));
  });
  const content = computed((): any[] | string => (Array.isArray(props.blok.content) && props.blok.content.length > 0 ? props.blok.content : props.blok.description));

  useJsonld(() => ({
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title.value,
    author: {
      '@type': 'Person',
      name: 'Sebastian Johansson',
      url: 'https://sebbejohansson.com',
    },
    dateCreated: date.value,
    articleBody: content.value,
  }));
</script>

<template>
  <div v-editable="blok" class="blog-entry" :class="{ 'blog-entry--page': isPage }">
    <div class="blog-entry__container">
      <div class="blog-entry__content">
        <time v-if="date && !isPage" class="blog-entry__date" :datetime="date">
          {{ formattedDate }}
        </time>
        <component :is="headingTag" v-if="title" class="blog-entry__title">
          <!-- Only link the title in the list; on the post page it would link to itself. -->
          <NuxtLink v-if="!isPage" :to="slug" class="blog-entry__title-link">
            {{ title }}
          </NuxtLink>
          <template v-else>
            {{ title }}
          </template>
        </component>
        <time v-if="date && isPage" class="blog-entry__date" :datetime="date">
          {{ formattedDate }}
        </time>
        <div class="blog-entry__body">
          <template v-if="Array.isArray(content)">
            <component
              :is="$resolveStoryBlokComponent(block)"
              v-for="block in content"
              :key="block._uid"
              :blok="block"
            />
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/foundation/mixins.scss";
.blog-entry {
  &__container {
    padding: 2rem 2.25rem;
    background-color: $cover-dark;
    border: 1px solid $border-dark;
    border-radius: 12px;
    color: $text-color;
    @include mixins.for-phone-only() {
      padding: 1.5rem 1.25rem;
    }
  }

  &__content {
    font-family: $body-font;
    font-size: 1.0625rem;
    line-height: 1.7;
    color: $text-muted;
    text-align: left;
    overflow-wrap: break-word;

    :deep(p) {
      margin: 0 0 1rem;
    }

    :deep(a) {
      color: $text-color;
      text-decoration: underline;
      text-underline-offset: 3px;
      &:hover {
        text-decoration: none;
      }
    }

    :deep(img) {
      display: block;
      max-width: 100%;
      height: auto;
      margin: 0.5rem 0 1rem;
      border-radius: 8px;
    }
  }

  &__date {
    display: block;
    margin: 0 0 0.5rem;
    font-family: $heading-font;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba($text-color, 0.5);
  }

  &__title {
    margin: 0 0 1rem;
    font-family: $heading-font;
    font-size: clamp(1.375rem, 1.2rem + 0.6vw, 1.625rem);
    font-weight: 600;
    letter-spacing: -0.01em;
    line-height: 1.25;
    color: $text-color;
  }

  // Overrides the generic link style above: titles stay plain.
  .blog-entry__title-link {
    color: $text-color;
    text-decoration: none;
  }

  // Post page: no card, styled like the portfolio detail page.
  &--page {
    .blog-entry__container {
      padding: 0;
      background-color: transparent;
      border: none;
      border-radius: 0;
    }

    .blog-entry__title {
      margin: 0 0 1rem;
      font-family: $body-font;
      font-size: clamp(2.5rem, 1.75rem + 2.5vw, 3.75rem);
      font-weight: 200;
      letter-spacing: -0.02em;
      line-height: 1.05;
    }

    .blog-entry__date {
      margin: 0 0 2rem;
      font-size: 0.8125rem;
    }

    .blog-entry__body {
      max-width: 65ch;
      // Outline so dark screenshots don't melt into the page background.
      :deep(img) {
        border: 1px solid rgba($text-color, 0.2);
      }
    }
  }
}
</style>
