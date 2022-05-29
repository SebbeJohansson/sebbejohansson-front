<script setup>
defineProps({ blok: Object });
</script>

<template>
  <div v-editable="blok">
    {{ blok }}
    <PartsMoleculesBigPortfolioEntry v-if="blok.size === 'big'" :title="blok.title" :description="blok.description"
      :picture="blok.cover.filename" :slug="blok.slug" />
    <PartsMoleculesSmallPortfolioEntry v-if="blok.size === 'small'" :title="blok.title" :link="blok.link" />
  </div>
</template>
