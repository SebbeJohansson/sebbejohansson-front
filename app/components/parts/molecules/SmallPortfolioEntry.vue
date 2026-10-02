<script setup lang="ts">
  defineProps<{
    title: string;
    link: string | null;
  }>();
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
  &__container {
    font-family: $body-font;
    font-weight: 500;
    color: $text-color;
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  &__container:hover {
    text-decoration: none;
  }

  &__container:focus-visible {
    outline: 2px solid $text-color;
    outline-offset: 2px;
    border-radius: 2px;
  }
}
</style>
