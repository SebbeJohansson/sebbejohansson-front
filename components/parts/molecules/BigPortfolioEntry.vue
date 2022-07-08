<script setup lang="ts">
import { ConcreteComponent } from "vue";
const NuxtLink = resolveComponent('NuxtLink')

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  picture: {
    type: String,
    default: 'fallback',
  },
  slug: {
    type: String,
  },
});

const imageUrl = computed((): string | undefined => (props.picture ? props.picture : undefined));
const entryUrl = computed((): string | undefined => (props.slug ? `/${props.slug}/` : undefined));
const componentType = computed((): string | ConcreteComponent => (entryUrl.value ? NuxtLink : 'div'));

useJsonld(() => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: props.title,
  image: {
    '@type': 'ImageObject',
    url: imageUrl.value,
    caption: props.title,
  },
  abstract: props.description,
}));
</script>

<template>
  <div class="big-portfolio-entry">
    <component :is="componentType" :href="entryUrl" class="big-portfolio-entry__container">
      <parts-atoms-image class="big-portfolio-entry__image" :image="imageUrl" :alt="title" :mobile-size="300"
        :tablet-size="400" :desktop-size="600" />
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

<style scoped>
.big-portfolio-entry {
  padding: 0.5em;
}

.big-portfolio-entry__container {
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

.big-portfolio-entry__image {
  width: 100%;
  margin: 0 0 10px;
  border-radius: 10px;
  height: 27em;
}

.big-portfolio-entry__content {
  flex-grow: 1;
}

.big-portfolio-entry__title {
  text-align: center;
  font-family: Roboto, Helvetica, Arial, Verdana, sans-serif;
  font-weight: 400;
  margin: 0 0 5px;
}

.big-portfolio-entry__description {
  line-height: 1.5em;
  color: #999;
}

@media (--phoneAndTablet) {
  .big-portfolio-entry__image {
    height: 16em;
  }
}
</style>
