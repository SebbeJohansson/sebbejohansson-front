<script setup lang="ts">
  useHead({
    titleTemplate: title => `Portfolio - ${title}`,
    meta: [{
      name: 'description',
      content: 'Projects by Sebastian Johansson, AI Engineer and developer.',
    }],
  });
</script>

<template>
  <div class="page portfolio">
    <content-portfolio-list />
  </div>
</template>

<style>
</style>
