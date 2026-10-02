<script setup lang="ts">
  import type { NuxtError } from '#app';

  const props = defineProps<{ error: NuxtError }>();

  const isNotFound = computed(() => props.error?.statusCode === 404);

  useHead({
    title: isNotFound.value ? 'Page not found' : 'Something went wrong',
  });
</script>

<template>
  <div class="error-page">
    <parts-organisms-desktop-menu />
    <div class="error-page__content">
      <h1 class="error-page__code">
        {{ error?.statusCode || 500 }}
      </h1>
      <p class="error-page__message">
        {{ isNotFound ? 'This page does not exist (any more).' : 'Something went wrong on my end.' }}
      </p>
      <NuxtLink class="error-page__button" to="/">
        Back to the start
      </NuxtLink>
    </div>
    <parts-organisms-footer />
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/elements/buttons.scss";
@use "@/assets/styles/foundation/global-vars";

.error-page {
  margin: 0 auto;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: $background-dark;
  color: $text-color;
}

.error-page__content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 1rem;
}

.error-page__code {
  margin: 0;
  font-family: $body-font;
  font-size: clamp(6rem, 4rem + 6vw, 9rem);
  font-weight: 200;
  letter-spacing: -0.03em;
  line-height: 1;
}

.error-page__message {
  margin: 1rem 0 1.75rem;
  font-family: $body-font;
  font-size: 1.125rem;
  color: $text-muted;
}

.error-page__button {
  @include buttons.btn-primary();

  &:hover {
    @include buttons.btn-primary-hover();
  }
}
</style>
