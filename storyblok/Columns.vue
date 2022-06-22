<script setup lang="ts">
defineProps({ blok: Object });
</script>

<template>
  <div v-editable="blok" class="columns">
    <StoryblokComponent v-if="blok.content && Array.isArray(blok.content) && blok.content.length > 0"
      v-for="block in blok.content" :key="block._uid" :blok="block" />
  </div>
</template>

<style>
.columns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
