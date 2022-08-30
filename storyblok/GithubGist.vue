<script setup lang="ts">
import VueEmbedGist from "vue-embed-gist";

defineProps({ blok: Object });
</script>

<template>
  <div v-editable="blok" class="github-gist">
    {{ blok }}
    <vue-embed-gist gist-id="9a6b863e3a3cfc0a79df457b0392b5d5" file="StoryblokDateTimeField.js" />
  </div>
</template>

<style>
</style>
