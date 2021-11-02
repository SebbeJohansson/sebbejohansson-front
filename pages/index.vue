<script lang="ts">
  import { defineComponent } from '@nuxtjs/composition-api';
  import ContentWithTitle from "~/components/content/ContentWithTitle.vue";
  import PortfolioList from "~/components/content/PortfolioList.vue";
  
  export default defineComponent({
    components: {
      ContentWithTitle,
      PortfolioList,
    },
  });
</script>

<template>
  <div class="index">
    <content-with-title
      :title="'Who am I?'"
    >
			<p>
        My name is Sebastian Johansson. I am a web developer/designer, game developer and all around geek. 
		  	My greatest interest is of course computers and the internet, and I love tech and gadgets.
			</p>
			<p>
				Anyway... I hope you enjoy your stay.
			</p>
    </content-with-title>
    <portfolio-list />
  </div>
</template>

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
