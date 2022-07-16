<script setup lang="ts">
defineProps({ blok: Object });
</script>

<template>
  <div v-editable="blok" class="columns">
    <component v-if="blok.content && Array.isArray(blok.content) && blok.content.length > 0"
      v-for="block in blok.content" :is="$resolveStoryBlokComponent(block)" :blok="block.content" :key="block._uid" />
  </div>
</template>

<style>
.columns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
