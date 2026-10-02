<script setup lang="ts">
  defineProps<{
    to: string;
    label: string;
  }>();
</script>

<template>
  <NuxtLink :to="to" class="back-link">
    ← {{ label }}
  </NuxtLink>
</template>

<style scoped lang="scss">
.back-link {
  align-self: flex-start;
  display: inline-block;
  margin-bottom: 1.25rem;
  font-family: $body-font;
  font-size: 0.9375rem;
  font-weight: 500;
  color: $text-muted;
  text-decoration: underline;
  text-underline-offset: 3px;
  &:hover {
    text-decoration: none;
  }
  &:focus-visible {
    outline: 2px solid $text-color;
    outline-offset: 2px;
    border-radius: 2px;
  }
}
</style>
