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
    content: {
      type: String,
    },
    slug: {
      type: String,
    },
    date: {
      type: String,
    },
  },
  setup(props) {
    const entryUrl = computed((): string | undefined => {
      return props.slug ? `portfolio/${props.slug}` : undefined;
    });

    return {
      entryUrl,
    };
  },
  methods: {
    method() {},
  },
});
</script>

<template>
  <div class="blog-entry">
    <div class="blog-entry__container">
      <div class="blog-entry__content">
        <h3 v-if="title" class="blog-entry__title">{{ title }}</h3>
        <h5 v-if="date" class="blog-entry__date">- {{ date }}</h5>
        <div v-if="content" v-html="content" class="blog-entry__content" />
      </div>
    </div>
  </div>
</template>

<style scoped>
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