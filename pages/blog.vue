<script lang="ts">
import { MetaInfo } from 'vue-meta';
import { defineNuxtComponent } from "#app";

export default defineNuxtComponent({
  head(): MetaInfo {
    return {
      title: 'Blog - SebbeJohansson',
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
