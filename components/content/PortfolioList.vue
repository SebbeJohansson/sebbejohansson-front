<script setup lang="ts">
import { defineComponent, onMounted, ref } from "@nuxtjs/composition-api";
import axios from "~/plugins/axios";
import ContentWithTitle from "~/components/content/ContentWithTitle.vue";
import BigPortfolioEntry from "~/components/parts/molecules/BigPortfolioEntry.vue";

interface PortfolioEntry {
  title: string;
  description: string;
  slug: string;
  entryPic: string;
}

export default defineComponent({
  components: {
    ContentWithTitle,
    BigPortfolioEntry,
  },
  setup() {
    let portfolioEntries = ref<PortfolioEntry[]>();
    const fetchEntries = async () => {
      const header = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      };

      const data = [
        "fields slug,entryPic,title,description;",
        "filter size=0;",
        "sort orderID asc;",
      ];

      try {
        await axios
          .post("/portfolios/get", data.join(""))
          .then((response) => {
            const entries = response.data as PortfolioEntry[];
            console.log(entries[0].title);
            portfolioEntries.value = response.data as PortfolioEntry[];
          })
          .catch((error) => {
            console.log(error.response);
          });
      } catch (error) {
        console.log(error);
      }
    };
    onMounted(fetchEntries);

    return { portfolioEntries, fetchEntries };
  },
});
</script>

<template>
  <div class="portfolio-list">
    <content-with-title :title="'Portfolio'">
      <div class="portfolio-list__grid">
        <big-portfolio-entry
          class="portfolio-list__entry"
          v-for="entry in portfolioEntries"
          :key="entry.id"
          :title="entry.title"
          :description="entry.description || null"
          :picture="entry.entryPic"
          :slug="entry.slug"
        />
      </div>
    </content-with-title>
  </div>
</template>

<style scoped>
.portfolio-list__grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

@media (--phone) {
  .portfolio-list__grid {
    grid-template-columns: 1fr;
  }
}

@media (--tablet) {
  .portfolio-list__grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>