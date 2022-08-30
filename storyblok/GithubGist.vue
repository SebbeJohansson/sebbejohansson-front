<script setup lang="ts">
defineProps({ blok: Object });
</script>

<template>
  <div v-editable="blok" class="github-gist">
    <content-github-gist-embed gist-id="9a6b863e3a3cfc0a79df457b0392b5d5" file="StoryblokDateTimeField.js" />
  </div>
</template>

<style>
</style>
