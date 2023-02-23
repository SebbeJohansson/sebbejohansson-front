<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
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

<style scoped lang="scss">
.small-portfolio-entry {
  padding-top: 0.5em;

  @media (pointer: fine) {
    padding-top: 0.9em;
  }

  &__container {
    color: $text-color;
    text-decoration: none;
  }

  &__container:hover,
  &__container:focus {
    text-decoration: underline;
  }

  &__title {
    text-align: center;
    font-family: Roboto, Helvetica, Arial, Verdana, sans-serif;
    font-weight: 400;
    margin: 0 0 5px;
  }
}
</style>
