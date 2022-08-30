<script setup lang="ts">
const props = defineProps({ blok: Object, raw: Object });

const title = computed((): string => props.blok.title || props.raw.name);
const slug = computed((): string => `/blog/${props.blok.slug || props.raw.slug}`);
const date = computed((): string | null => props.blok.date);
const content = computed((): [] | string => (props.blok.content && Array.isArray(props.blok.content) && props.blok.content.length > 0 ? props.blok.content : props.blok.description));

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
        <h5 v-if="date" class="blog-entry__date">
          - {{ date }}
        </h5>
        <component
          :is="$resolveStoryBlokComponent(block)"
          v-for="block in content"
          v-if="content && Array.isArray(content) && content.length > 0"
          :key="block._uid"
          :blok="block"
        />
      </div>
    </div>
  </div>
</template>

<style>
.blog-entry__container {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px;
  background: #fff;
  border: 1px solid #ddd;
  font-size: 1rem;
  vertical-align: top;
  box-shadow: 0 0 5px #ddd;
  text-decoration: none;
  color: black;
}

.blog-entry__content {
  flex-grow: 1;
}

.blog-entry__title {
  text-align: left;
  font-family: Roboto, Helvetica, Arial, Verdana, sans-serif;
  font-weight: 400;
  margin: 0 0 5px;
}

.blog-entry__title-link {
  text-decoration: none;
  color: black;
}

.blog-entry__date {
  text-align: left;
  font-family: Roboto, Helvetica, Arial, Verdana, sans-serif;
  font-weight: 400;
  margin: 0 0 5px;
}

.blog-entry__content {
  line-height: 1.5em;
  text-align: left;
  font-family: Roboto, Helvetica, Arial, Verdana, sans-serif;
}
</style>
