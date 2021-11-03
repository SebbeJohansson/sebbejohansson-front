<script setup lang="ts">
import {
  defineComponent,
  onMounted,
  ref,
  reactive,
} from "@nuxtjs/composition-api";
import axios from "~/plugins/axios";
import ContentWithTitle from "~/components/content/ContentWithTitle.vue";
import BigPortfolioEntry from "~/components/parts/molecules/BigPortfolioEntry.vue";
import SmallPortfolioEntry from "~/components/parts/molecules/SmallPortfolioEntry.vue";

interface PortfolioEntry {
  title: string;
  description: string;
  slug: string;
  entryPic: string;
  size: number;
}

export default defineComponent({
  components: {
    ContentWithTitle,
    BigPortfolioEntry,
    SmallPortfolioEntry,
  },
  setup() {
    let bigPortfolioEntries = reactive<PortfolioEntry[]>(<PortfolioEntry[]>[]);
    let smallPortfolioEntries = reactive<PortfolioEntry[]>(
      <PortfolioEntry[]>[]
    );
    const fetchEntries = async () => {
      const header = {
        "Content-Type": "application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin": "*",
      };

      const data = [
        "fields slug,entryPic,title,description,size;",
        "sort orderID asc;",
      ];

      try {
        await axios
          .post("/portfolios/get", data.join(""))
          .then((response) => {
            const entries = response.data as PortfolioEntry[];
            entries.forEach((entry) => {
              if (entry.size === 0) {
                bigPortfolioEntries.push(entry);
              } else {
                smallPortfolioEntries.push(entry);
              }
            });
          })
          .catch((error) => {
            console.log(error.response);
          });
      } catch (error) {
        console.log(error);
      }
    };
    onMounted(fetchEntries);

    return { bigPortfolioEntries, smallPortfolioEntries, fetchEntries };
  },
});
</script>

<template>
  <div class="portfolio-list">
    <content-with-title :title="'Portfolio'">
      <div class="portfolio-list__grid">
        <big-portfolio-entry
          class="portfolio-list__entry"
          v-for="entry in bigPortfolioEntries"
          :key="entry.id"
          :title="entry.title"
          :description="entry.description || null"
          :picture="entry.entryPic"
          :slug="entry.slug"
        />
      </div>
      <h3 class="portfolio-list__title">Other Projects</h3>
      <small-portfolio-entry
        v-for="entry in smallPortfolioEntries"
        :key="entry.id"
        :title="entry.title"
        :slug="entry.slug"
      />
    </content-with-title>
  </div>
</template>

<style scoped>
.portfolio-list__grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

.portfolio-list__title {
  margin: 0px;
  text-align: center;
  font-family: raleway, Helvetica, Arial, Verdana, sans-serif;
  font-size: 2em;
  font-weight: 400;
  margin-top: 10px;
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