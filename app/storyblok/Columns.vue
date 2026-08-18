<script setup lang="ts">
  defineProps<{ blok: Record<string, any> }>();
</script>

<template>
  <div v-editable="blok" class="columns">
    <template v-if="Array.isArray(blok.content)">
      <component
        :is="$resolveStoryBlokComponent(block)"
        v-for="block in blok.content"
        :key="block._uid"
        :blok="block.content"
      />
    </template>
  </div>
</template>

<style>
.columns {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
