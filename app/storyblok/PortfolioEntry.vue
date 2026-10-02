<script setup lang="ts">
  const props = defineProps<{ blok: Record<string, any>; raw?: Record<string, any> }>();

  const imageUrl = computed((): string => props.blok.cover?.filename || 'null');
  const title = computed((): string => props.blok.title || props.raw?.name);
  const duration = computed((): string | null => props.blok.duration ?? null);
  const role = computed((): string | null => props.blok.role || null);
  const link = computed((): string | null => props.blok.link?.url || props.blok.link?.cached_url || null);
  const code = computed((): string | null => props.blok.code?.url || props.blok.code?.cached_url || null);
  const content = computed((): any[] | string => (Array.isArray(props.blok.content) && props.blok.content.length > 0 ? props.blok.content : props.blok.description));

  useJsonld(() => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title.value,
    image: {
      '@type': 'ImageObject',
      url: imageUrl.value,
      caption: title.value,
    },
    articleBody: content.value,
  }));
</script>

<template>
  <div v-editable="blok" class="portfolio-entry">
    <parts-atoms-back-link to="/portfolio/" label="All projects" />
    <div v-if="blok" class="portfolio">
      <h1 v-if="title" class="portfolio__title">
        {{ title }}
      </h1>
      <aside class="portfolio__sidebar">
        <parts-atoms-image
          class="portfolio__image"
          :image="imageUrl"
          :alt="title"
          :mobile-size="400"
          :tablet-size="400"
          :desktop-size="800"
          loading="eager"
        />
        <dl class="portfolio__info-box">
          <div v-if="duration" class="portfolio__sidebar-line">
            <dt class="portfolio__sidebar-line-title">
              Duration
            </dt>
            <dd>{{ duration }}</dd>
          </div>
          <div v-if="role" class="portfolio__sidebar-line">
            <dt class="portfolio__sidebar-line-title">
              Role
            </dt>
            <dd>{{ role }}</dd>
          </div>
          <div v-if="link" class="portfolio__sidebar-line">
            <dt class="portfolio__sidebar-line-title">
              View
            </dt>
            <dd>
              <NuxtLink :href="link" target="_blank" class="portfolio__sidebar-line-link">
                Visit site
              </NuxtLink>
            </dd>
          </div>
          <div v-if="code" class="portfolio__sidebar-line">
            <dt class="portfolio__sidebar-line-title">
              Code
            </dt>
            <dd>
              <NuxtLink :href="code" target="_blank" class="portfolio__sidebar-line-link">
                View code
              </NuxtLink>
            </dd>
          </div>
        </dl>
      </aside>
      <div class="portfolio__content">
        <template v-if="Array.isArray(content)">
          <component
            :is="$resolveStoryBlokComponent(block)"
            v-for="block in content"
            :key="block._uid"
            :blok="block"
          />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-else v-html="content" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/foundation/mixins.scss";
.portfolio-entry {
  @include mixins.content-width();
  width: 100%;
  padding-top: 3.5rem;
  padding-bottom: 4rem;
  box-sizing: border-box;
}

.portfolio {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 400px;
  grid-template-areas:
    "title side"
    "content side";
  grid-template-rows: auto 1fr;
  column-gap: 4rem;

  &__title {
    grid-area: title;
    margin: 0 0 1.75rem;
    font-family: $body-font;
    font-size: clamp(2.5rem, 1.75rem + 2.5vw, 3.75rem);
    font-weight: 200;
    letter-spacing: -0.02em;
    line-height: 1.05;
  }

  &__content {
    grid-area: content;
    max-width: 65ch;
    font-family: $body-font;
    font-size: 1.0625rem;
    line-height: 1.7;
    color: $text-muted;
    :deep(p) {
      margin: 0 0 1rem;
    }
  }

  &__sidebar {
    grid-area: side;
    overflow: hidden;
    background-color: $cover-dark;
    border: 1px solid $border-dark;
    border-radius: 12px;
  }

  // Fixed ratio so the box keeps its size before the image has loaded.
  &__image {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    overflow: hidden;
    background-color: $cover-light;
    :deep(img) {
      display: block;
      object-position: top;
    }
  }

  &__info-box {
    display: grid;
    gap: 1rem;
    margin: 0;
    padding: 1.25rem 1.5rem 1.5rem;
    font-family: $body-font;
    dd {
      margin: 0;
      font-size: 0.9375rem;
      font-weight: 500;
    }
  }

  &__sidebar-line-title {
    margin-bottom: 0.25rem;
    font-family: $heading-font;
    font-size: 0.6875rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba($text-color, 0.5);
  }

  &__sidebar-line-link {
    color: $text-color;
    text-decoration: underline;
    text-underline-offset: 3px;
    &:hover {
      text-decoration: none;
    }
    &:focus-visible {
      outline: 2px solid $text-color;
      outline-offset: 2px;
      border-radius: 2px;
    }
  }

  @include mixins.for-phone-and-tablet-only() {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas:
      "title"
      "content"
      "side";
    grid-template-rows: auto;

    &__sidebar {
      max-width: 400px;
      margin-top: 1rem;
    }
  }
}
</style>
