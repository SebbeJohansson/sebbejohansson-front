<script setup lang="ts">
  useHead({
    titleTemplate: title => `Blog - ${title}`,
    meta: [{
      name: 'description',
      content: 'Posts about AI, software development, and tech by Sebastian Johansson.',
    }],
  });
</script>

<template>
  <div class="page blog-page">
    <content-blog-post-list />
  </div>
</template>

<style>
</style>
