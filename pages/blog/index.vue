<script setup lang="ts">

useHead({
  titleTemplate: title => `Blog - ${title}`,
});
</script>

<template>
  <div class="page blog-page">
    <content-blog-post-list />
  </div>
</template>

<style>
</style>
