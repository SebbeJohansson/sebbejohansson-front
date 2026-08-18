<script setup lang="ts">
  defineProps<{ blok: Record<string, any> }>();
</script>

<template>
  <div v-editable="blok" class="github-gist">
    <content-github-gist-embed :gist-id="blok.gist_id" :file="blok.file_name" :fetch-key="blok._uid" />
  </div>
</template>

<style>
</style>
