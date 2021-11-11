<script setup lang="ts">
import { defineComponent, PropType } from "@nuxtjs/composition-api";
import ContentBlock from "~/components/content/ContentBlock.vue";

export default defineComponent({
  components: {
    ContentBlock,
  },
  props: {
    title: {
      type: String as PropType<String>,
      required: true,
    },
  },
});
</script>

<template>
  <div class="content-with-title">
    <content-block>
      <h2 class="content-with-title__title">{{ title }}</h2>
      <div class="content-with-title__content">
        <slot />
      </div>
    </content-block>
  </div>
</template>

<style scoped>
.content-with-title__title {
  font-family: raleway, Helvetica, Arial, Verdana, sans-serif;
  font-weight: 200;
  text-align: center;
  font-size: 4em;
  margin: 30px 0 15px;
}
.content-with-title__content {
  text-align: center;
}

@media (--phoneAndTablet) {
  .content-with-title__title {
    font-size: 3em;
  }
}
</style>
