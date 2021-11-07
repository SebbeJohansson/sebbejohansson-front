<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import BlogPostList from "~/components/content/BlogPostList.vue";

export default defineComponent({
  components: {
    BlogPostList,
  },
});
</script>

<template>
  <div class="index">
    <blog-post-list />
  </div>
</template>

<style>
</style>
