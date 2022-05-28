<script lang="ts">
import { MetaInfo } from 'vue-meta';
import { defineComponent } from '@nuxtjs/composition-api';
import DesktopMenu from '~/components/parts/organisms/DesktopMenu.vue';
import Footer from '~/components/parts/organisms/Footer.vue';

export default defineComponent({
  components: {
    DesktopMenu,
    Footer,
  },
  head(): MetaInfo {
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

    return {
      link,
    };
  },
});
</script>

<template>
  <div class="default-layout">
    <desktop-menu />
    <slot class="default-layout__content" />
    <Footer />
  </div>
</template>

<style>
.default-layout {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f9f6f6;
}

.default-layout__content {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
