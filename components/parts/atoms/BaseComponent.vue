<script setup lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';

export default defineComponent({
  components: {
  },
  props: {
    prop: {
      type: String as PropType<string>,
      required: true,
    },
  },
  methods: {
    method() {
    },
  },
});
</script>

<template>
  <div class="component-name" />
</template>

<style scoped>

</style>
