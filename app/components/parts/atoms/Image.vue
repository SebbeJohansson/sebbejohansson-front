<script setup lang="ts">
  const props = withDefaults(defineProps<{
    image: string;
    alt: string;
    mobileSize?: number;
    tabletSize?: number;
    desktopSize?: number;
    loading?: 'lazy' | 'eager';
  }>(), {
    mobileSize: 800,
    tabletSize: 1600,
    desktopSize: 2000,
    loading: 'lazy',
  });
  const nuxtApp = useNuxtApp();
  const mobileImageUrl = computed((): string => nuxtApp.$toMediaUrl(props.image, { maxWidth: props.mobileSize }));
  const tabletImageUrl = computed((): string => nuxtApp.$toMediaUrl(props.image, { maxWidth: props.tabletSize }));
  const desktopImageUrl = computed((): string => nuxtApp.$toMediaUrl(props.image, { maxWidth: props.desktopSize }));
</script>

<template>
  <div class="image">
    <picture class="image__picture">
      <source :srcset="desktopImageUrl" media="(min-width: 1200px)">
      <source :srcset="tabletImageUrl" media="(min-width: 800px)">
      <img class="image__img" :src="mobileImageUrl" :alt="alt" :loading="loading">
    </picture>
  </div>
</template>

<style scoped lang="scss">
.image__picture {
  width: 100%;
  height: 100%;
  position: relative;
  display: block;
}

.image__img {
  object-fit: cover;
  object-position: bottom;
  width: 100%;
  height: 100%;
}
</style>
