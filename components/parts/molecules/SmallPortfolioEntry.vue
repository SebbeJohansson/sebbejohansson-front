<script lang="ts">
import { defineNuxtComponent } from '#app';

export default defineNuxtComponent({
  components: {},
  props: {
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  methods: {
    method() { },
  },
});
</script>

<template>
  <div v-if="link" class="small-portfolio-entry">
    <NuxtLink :href="link" target="_blank" class="small-portfolio-entry__container">
      <span class="small-portfolio-entry__title">
        {{ title }}
      </span>
    </NuxtLink>
  </div>
</template>

<style scoped>
.small-portfolio-entry {
  padding: 0.2em;
}

.small-portfolio-entry__title {
  text-align: center;
  font-family: Roboto, Helvetica, Arial, Verdana, sans-serif;
  font-weight: 400;
  margin: 0 0 5px;
  color: black;
  text-decoration: none;
}

.small-portfolio-entry__container:hover,
.small-portfolio-entry__container:focus {
  color: #1084ff;
  text-decoration: underline;
}
</style>
