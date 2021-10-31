<template>
  <div class="index">
    <div class="index__intro">
      <h1 class="index__title">
      </h1>
      <p class="index__about">
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from '@nuxtjs/composition-api';
  
  export default defineComponent({
    setup(){
      
    },
    async fetch() {
    }
  });
</script>

<style>

.index__title{
  font-family: 'Montserrat',sans-serif;
  font-size: 6rem;
  line-height: 6rem;
  margin: 0;
}
.index__about{
  font-family: 'Montserrat', sans-serif;
  margin: 0;
}


</style>
