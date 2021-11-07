<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";
import ContentWithTitle from "~/components/content/ContentWithTitle.vue";
import PortfolioList from "~/components/content/PortfolioList.vue";
import StalkList from "~/components/content/StalkList.vue";

export default defineComponent({
  components: {
    ContentWithTitle,
    PortfolioList,
    StalkList,
  },
});
</script>

<template>
  <div class="index">
    <content-with-title :title="'Who am I?'">
      <p>
        My name is Sebastian Johansson. I am a web developer/designer, game
        developer and all around geek. My greatest interest is of course
        computers and the internet, and I love tech and gadgets.
      </p>
      <p>Anyway... I hope you enjoy your stay.</p>
    </content-with-title>
    <portfolio-list id="portfolio" />
    <div class="index__trakt">
      <a
        target="_blank"
        href="https://trakt.tv/users/redeyeddragon"
        class="index__trakt-link"
      >
        <img
          class="index__trakt-image"
          width="500"
          height="133"
          alt="redeyeddragon"
          src="https://widgets.trakt.tv/users/176286ec5d57f496186c5954408a9ddc/watched/banner@2x.jpg"
        />
      </a>
    </div>
    <stalk-list class="index__stalk" />
  </div>
</template>

<style>
.index__title {
  font-family: "Montserrat", sans-serif;
  font-size: 6rem;
  line-height: 6rem;
  margin: 0;
}
.index__about {
  font-family: "Montserrat", sans-serif;
  margin: 0;
}
.index__trakt {
  margin: 0 auto;
}
.index__trakt-link {
  display: block;
}
.index__trakt-image {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>
