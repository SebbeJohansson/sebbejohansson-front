<script setup lang="ts">
import { RichTextRenderer } from '@marvr/storyblok-rich-text-vue-renderer';
defineProps({ blok: Object });
</script>

<template>
  <div v-editable="blok" class="text">
    <RichTextRenderer :document="(blok.text as DocumentNode)" />
  </div>
</template>
