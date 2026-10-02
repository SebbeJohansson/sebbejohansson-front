<script setup lang="ts">
  import type { Component } from 'vue';

  const NuxtLink = resolveComponent('NuxtLink');

  const props = withDefaults(defineProps<{
    title: string;
    description?: string | null;
    picture?: string;
    slug?: string;
  }>(), {
    description: '',
    picture: 'fallback',
    slug: undefined,
  });

  const imageUrl = computed((): string => props.picture || 'fallback');
  const entryUrl = computed((): string | undefined => (props.slug ? `/${props.slug}/` : undefined));
  const componentType = computed((): string | Component => (entryUrl.value ? NuxtLink : 'div'));

  useJsonld(() => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: props.title,
    image: {
      '@type': 'ImageObject',
      url: imageUrl.value,
      caption: props.title,
    },
    abstract: props.description ?? undefined,
  }));
</script>

<template>
  <div class="big-portfolio-entry">
    <component :is="componentType" :href="entryUrl" class="big-portfolio-entry__container">
      <parts-atoms-image
        class="big-portfolio-entry__image"
        :image="imageUrl"
        :alt="title"
        :mobile-size="300"
        :tablet-size="400"
        :desktop-size="600"
      />
      <div class="big-portfolio-entry__content">
        <h3 v-if="title" class="big-portfolio-entry__title">
          {{ title }}
        </h3>
        <p v-if="description" class="big-portfolio-entry__description">
          {{ description }}
        </p>
      </div>
    </component>
  </div>
</template>

<style scoped lang="scss">
.big-portfolio-entry {
  &__container {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    background-color: $cover-dark;
    border: 1px solid $border-dark;
    border-radius: 12px;
    color: $text-color;
    text-align: left;
    text-decoration: none;
    transition: border-color 0.2s ease;
  }

  a.big-portfolio-entry__container {
    &:hover {
      border-color: rgba($text-color, 0.25);
    }
    &:focus-visible {
      outline: 2px solid $text-color;
      outline-offset: 2px;
    }
  }

  &__image {
    aspect-ratio: 16 / 9;
    width: 100%;
    overflow: hidden;
    :deep(img) {
      display: block;
      object-position: top;
    }
  }

  &__content {
    flex-grow: 1;
    padding: 1rem 1.25rem 1.25rem;
  }

  &__title {
    margin: 0 0 0.4rem;
    font-family: $heading-font;
    font-size: 1.0625rem;
    font-weight: 600;
  }

  &__description {
    margin: 0;
    font-family: $body-font;
    font-size: 0.9375rem;
    line-height: 1.55;
    color: $text-muted;
  }
}
</style>
