<script setup lang="ts">
import {
  defineComponent,
  ref,
  useStatic,
  computed,
} from '@nuxtjs/composition-api';
import axios from '~/plugins/axios';
import ContentWithTitle from '~/components/content/ContentWithTitle.vue';
import BigPortfolioEntry from '~/components/parts/molecules/BigPortfolioEntry.vue';
import SmallPortfolioEntry from '~/components/parts/molecules/SmallPortfolioEntry.vue';

interface PortfolioEntry {
  title: string;
  description: string;
  slug: string;
  entryPic: string;
  link: string;
  size: number;
}

interface PortfolioEntries {
  entries: PortfolioEntry[];
}

export default defineComponent({
  components: {
    ContentWithTitle,
    BigPortfolioEntry,
    SmallPortfolioEntry,
  },
  setup() {
    const portfolioId = ref('default');
    const rawPortfolioEntries = useStatic<PortfolioEntries>(
      async () => {
        const portfolioEntriesLocal: PortfolioEntries = {
          entries: [],
        };
        const data = [
          'fields slug,entryPic,title,description,size,link;',
          'filter status=1;',
          'sort orderID asc;',
        ];

        try {
          await axios
            .post('/portfolios/get', data.join(''))
            .then((response) => {
              const entries = response.data as PortfolioEntry[];
              entries.forEach((entry) => {
                portfolioEntriesLocal.entries.push(entry);
              });
            })
            .catch((error) => {
              console.log(error.response);
            });
        } catch (error) {
          console.log(error);
        }
        return portfolioEntriesLocal;
      },
      portfolioId,
      'portfolioentries',
    );

    const bigPortfolioEntries = computed<PortfolioEntry[]>(
      (): PortfolioEntry[] => rawPortfolioEntries.value?.entries.filter(
        (entry) => entry.size === 0,
      ) as PortfolioEntry[],
    );

    const smallPortfolioEntries = computed<PortfolioEntry[]>(
      (): PortfolioEntry[] => rawPortfolioEntries.value?.entries.filter(
        (entry) => entry.size === 1,
      ) as PortfolioEntry[],
    );

    return { bigPortfolioEntries, smallPortfolioEntries };
  },
});
</script>

<template>
  <div class="portfolio-list">
    <content-with-title :title="'Portfolio'">
      <div class="portfolio-list__grid">
        <big-portfolio-entry
          v-for="entry in bigPortfolioEntries"
          :key="entry.id"
          class="portfolio-list__entry"
          :title="entry.title"
          :description="entry.description || null"
          :picture="entry.entryPic"
          :slug="entry.slug"
        />
      </div>
      <h3 class="portfolio-list__title">
        Other Projects
      </h3>
      <small-portfolio-entry
        v-for="entry in smallPortfolioEntries"
        :key="entry.id"
        :title="entry.title"
        :link="entry.link"
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
