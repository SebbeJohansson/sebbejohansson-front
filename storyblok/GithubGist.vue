<script setup lang="ts">
const props = defineProps({ blok: Object });
</script>

<template>
  <div v-editable="blok" class="github-gist">
    {{ blok }}
  </div>
</template>

<style>
.text img {
  max-width: 100%;
}
</style>
