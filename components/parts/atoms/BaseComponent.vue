<script setup lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api';
import BaseComponent from '~/components/parts/atoms/BaseComponent.vue';

export default defineComponent({
  components: {
  },
  props: {
    prop: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props) {
    return {
    };
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
