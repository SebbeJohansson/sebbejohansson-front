<script setup lang="ts">
import { renderRichText } from '@storyblok/js';

const props = defineProps({ blok: Object });
const nuxtApp = useNuxtApp();
const text = computed((): string => nuxtApp.$formatRichText(renderRichText(props.blok.text)));
</script>

<template>
  <div v-editable="blok" class="text">
    <div v-html="text" />
  </div>
</template>

<style>
.text img {
  max-width: 100%;
}
</style>
