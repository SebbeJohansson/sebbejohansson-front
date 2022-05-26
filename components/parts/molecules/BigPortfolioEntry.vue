<script setup lang="ts">
import { defineComponent, computed, useContext } from '@nuxtjs/composition-api';

export default defineComponent({
  components: {},
  props: {
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
  },
  setup(props) {
    const context = useContext();
    const imageUrl = computed((): string | undefined => (props.picture
      ? context.$toMediaUrl(props.picture, { maxHeight: 100, maxWidth: 100 })
      : undefined));

    const entryUrl = computed((): string | undefined => (props.slug ? `portfolio/${props.slug}/` : undefined));

    return {
      imageUrl,
      entryUrl,
      componentType: computed((): string => (entryUrl.value ? 'nuxt-link' : 'div')),
    };
  },
  methods: {
    method() {},
  },
});
</script>

<template>
  <div class="big-portfolio-entry">
    <component
      :is="componentType"
      :to="entryUrl"
      class="big-portfolio-entry__container"
    >
      <img
        class="big-portfolio-entry__image"
        :alt="title"
        :src="imageUrl"
        loading="lazy"
      >
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
  object-fit: cover;
  object-position: bottom;
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
