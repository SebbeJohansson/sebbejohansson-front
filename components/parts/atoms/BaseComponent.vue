<script setup lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import BaseComponent from "~/components/parts/atoms/BaseComponent.vue";

export default defineComponent({
  components: {
  },
  props: {
    prop: {
      type: String as PropType<String>,
      required: true
    } 
  },
  setup(props) {
    return {
    }
  },
  methods:{
    method() {
    },
  }
})
</script>

<template>
  <div class="component-name">
  </div>
</template>

<style scoped>

</style>