<script setup lang="ts">
const props = defineProps({ blok: Object });
const nuxtApp = useNuxtApp();
const storyblokApi = useStoryblokApi();
const text = computed((): string => nuxtApp.$formatRichText(storyblokApi.richTextResolver.render(props.blok.text)));
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
