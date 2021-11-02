<script setup lang="ts">
import { defineComponent, PropType, computed } from "@nuxtjs/composition-api";
import BaseComponent from "~/components/parts/atoms/BaseComponent.vue";

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
    },
    slug: {
      type: String,
    },
  },
  setup(props) {
    const imageUrl = computed((): string => {
      return props.picture
        ? `https://admin.sebbejohansson.com/images/${props.picture}`
        : "null";
    });

    return {
      imageUrl,
    };
  },
  methods: {
    method() {},
  },
});
</script>

<template>
  <div class="big-portfolio-entry">
    <nuxt-link v-if="slug" :to="slug" class="big-portfolio-entry__container">
      <div
        class="big-portfolio-entry__image"
        :style="`background-image: url(${imageUrl})`"
        :alt="title"
      />
      <h3 v-if="title" class="big-portfolio-entry__title">{{ title }}</h3>
      <p v-if="description" class="big-portfolio-entry__description">
        {{ description }}
      </p>
    </nuxt-link>
    <div v-else class="big-portfolio-entry__container">
      <div
        class="big-portfolio-entry__image"
        :style="`background-image: url(${imageUrl})`"
        :alt="title"
      />
      <h3 v-if="title" class="big-portfolio-entry__title">{{ title }}</h3>
      <p v-if="description" class="big-portfolio-entry__description">
        {{ description }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.big-portfolio-entry {
}
.big-portfolio-entry__container {
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin: 0 0 2.5% 2.5%;
  background: #fff;
  border: 1px solid #ddd;
  font-size: 1rem;
  vertical-align: top;
  box-shadow: 0 0 5px #ddd;
}
.big-portfolio-entry__image {
  width: 100%;
  margin: 0 0 10px;
  border-radius: 10px;
  height: 78%;
  object-fit: cover;
  object-position: bottom;
}
.big-portfolio-entry__title {
  margin: 0 0 5px;
}
.big-portfolio-entry__description {
  line-height: 1.5em;
  color: #999;
}
</style>