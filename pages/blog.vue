<script lang="ts">
import { MetaInfo } from "vue-meta";
import { defineComponent } from "@nuxtjs/composition-api";
import BlogPostList from "~/components/content/BlogPostList.vue";

export default defineComponent({
  components: {
    BlogPostList,
  },
  head(): MetaInfo {
    return {
      title: "Blog - SebbeJohansson",
    };
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
