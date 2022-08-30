<script setup lang="ts">
defineProps({ blok: Object });
</script>

<template>
  <div v-editable="blok" class="columns">
    <component
      :is="$resolveStoryBlokComponent(block)"
      v-for="block in blok.content"
      v-if="blok.content && Array.isArray(blok.content) && blok.content.length > 0"
      :key="block._uid"
      :blok="block.content"
    />
  </div>
</template>

<style>
.columns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
