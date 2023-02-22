<script setup lang="ts">
  const link = [];

  link.push({
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/apple-touch-icon.png',
  });
  link.push({
    rel: 'icon',
    type: 'image/png',
    sizes: '192x192',
    href: '/android-chrome-192x192.png',
  });
  link.push({
    rel: 'icon',
    type: 'image/png',
    sizes: '512x512',
    href: '/android-chrome-512x512.png',
  });
  link.push({
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/favicon-32x32.png',
  });
  link.push({
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/favicon-16x16.png',
  });

  useHead({
    link,
  });
</script>

<template>
  <div class="homepage-layout">
    <slot />
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/foundation/global-vars";
.homepage-layout {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: $background-dark;
  color: $text-color;
}

.homepage-layout :deep(.page) {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
