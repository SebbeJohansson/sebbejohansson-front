<script setup lang="ts">
  const props = defineProps<{ blok: Record<string, any>; raw?: Record<string, any> }>();

  const title = computed((): string => props.blok.title || props.raw?.name);
  const slug = computed((): string => `/blog/${props.blok.slug || props.raw?.slug}/`);
  const date = computed((): string | undefined => props.blok.date || undefined);
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
  <div v-editable="blok" class="blog-entry">
    <div class="blog-entry__container">
      <div class="blog-entry__content">
        <h3 v-if="title" class="blog-entry__title">
          <NuxtLink :to="slug" class="blog-entry__title-link">
            {{ title }}
          </NuxtLink>
        </h3>
        <h4 v-if="date" class="blog-entry__date">
          - {{ date }}
        </h4>
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
</template>

<style scoped lang="scss">
.blog-entry {
  &__container {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 10px;
    background: transparent;
    border: 1px solid $border-dark;
    box-shadow: 0 0 5px $shadow-dark;
    font-size: 1rem;
    vertical-align: top;
    text-decoration: none;
    color: $text-color;
  }

  &__content {
    flex-grow: 1;
  }

  &__title {
    text-align: left;
    font-family: Roboto, Helvetica, Arial, Verdana, sans-serif;
    font-weight: 400;
    margin: 0 0 5px;
  }

  &__title-link {
    text-decoration: none;
    color: $text-color;
  }

  &__date {
    text-align: left;
    font-family: Roboto, Helvetica, Arial, Verdana, sans-serif;
    font-weight: 400;
    margin: 0 0 5px;
  }

  &__content {
    line-height: 1.5em;
    text-align: left;
    font-family: Roboto, Helvetica, Arial, Verdana, sans-serif;
  }
}
</style>
