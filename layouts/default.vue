<script lang="ts">
  import { defineComponent, ref, watch } from '@nuxtjs/composition-api';
  import DesktopMenu from "~/components/parts/organisms/DesktopMenu.vue";
  import Footer from "~/components/parts/organisms/Footer.vue";

  export default defineComponent({
    components: {
      DesktopMenu,
      Footer,
    },
  });
</script>

<template>
  <div class="default-layout">
    <desktop-menu />
    <Nuxt class="default-layout__content"/>
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

.default-layout__content{
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.default-layout__content > *:first-child {
  margin-top: 10px;
}

.default-layout__content > *:last-child {
  margin-bottom: 10px;
}

</style>
