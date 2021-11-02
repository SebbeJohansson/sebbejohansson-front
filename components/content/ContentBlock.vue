<script setup lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
})
</script>

<template>
  <div class="content-block">
    <slot/>
  </div>
</template>

<style scoped>
.content-block{
  max-width: 1300px;
  padding: 30px;
  margin: 10px auto 10px;
  font-family: Roboto, Helvetica, Arial, Verdana, sans-serif;
  background-color: white;
  border-bottom: 1px solid rgb(206, 206, 206);
  box-shadow: 0 0 3px #c0c1c2;
}
</style>