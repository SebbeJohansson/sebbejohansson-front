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

    const entryUrl = computed((): string | undefined => {
      return props.slug ? `portfolio/${props.slug}` : undefined;
    });

    return {
      imageUrl,
      entryUrl,
    };
  },
  methods: {
    method() {},
  },
});
</script>

<template>
  <div class="big-portfolio-entry">
    <nuxt-link
      v-if="entryUrl"
      :to="entryUrl"
      class="big-portfolio-entry__container"
    >
      <div
        class="big-portfolio-entry__image"
        :style="`background-image: url(${imageUrl})`"
        :alt="title"
      />
      <div class="big-portfolio-entry__content">
        <h3 v-if="title" class="big-portfolio-entry__title">{{ title }}</h3>
        <p v-if="description" class="big-portfolio-entry__description">
          {{ description }}
        </p>
      </div>
    </nuxt-link>
    <div v-else class="big-portfolio-entry__container">
      <div
        class="big-portfolio-entry__image"
        :style="`background-image: url(${imageUrl})`"
        :alt="title"
      />
      <div class="big-portfolio-entry__content">
        <h3 v-if="title" class="big-portfolio-entry__title">{{ title }}</h3>
        <p v-if="description" class="big-portfolio-entry__description">
          {{ description }}
        </p>
      </div>
    </div>
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
  background-size: cover;
  background-position: bottom center;
  background-repeat: no-repeat;
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
</style>