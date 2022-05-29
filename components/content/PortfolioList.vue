<script lang="ts">
import { defineNuxtComponent } from '#app'

interface PortfolioEntry {
  title: string;
  description: string;
  slug: string;
  entryPic: string;
  link: string;
  size: string;
}

export default defineNuxtComponent({
  async setup() {
    /* const portfolioId = ref('default')
    const rawPortfolioEntries = useState<PortfolioEntries>(
      'rawPortfolioEntries',
      () => {
        const portfolioEntriesLocal: PortfolioEntries = {
          entries: []
        }
        const data = [
          'fields slug,entryPic,title,description,size,link;',
          'filter status=1;',
          'sort orderID asc;'
        ]

        try {
          await axios
            .post('/portfolios/get', data.join(''))
            .then((response) => {
              const entries = response.data as PortfolioEntry[]
              entries.forEach((entry) => {
                portfolioEntriesLocal.entries.push(entry)
              })
            })
            .catch((error) => {
              console.log(error.response)
            })
        } catch (error) {
          console.log(error)
        }
        return portfolioEntriesLocal
      },
    ) */

    const rawPortfolioEntries: PortfolioEntry[] = [];
    const storyblokApi = useStoryblokApi();
    await storyblokApi.get("cdn/stories", {
      starts_with: "portfolio/",
      version: "published"
    }).then((response) => {
      console.log(response.data.stories);
      response.data.stories.forEach((story) => {
        console.log(story);
        rawPortfolioEntries.push({
          title: story.content.title || story.name,
          description: story.content.description,
          slug: story.slug,
          entryPic: story.content.cover.filename,
          link: story.content.link,
          size: story.content.size
        });
      });
      console.log(rawPortfolioEntries);
    });

    const bigPortfolioEntries = computed<PortfolioEntry[]>(
      (): PortfolioEntry[] => rawPortfolioEntries.filter(
        entry => entry.size === "big"
      ) as PortfolioEntry[]
    )

    const smallPortfolioEntries = computed<PortfolioEntry[]>(
      (): PortfolioEntry[] => rawPortfolioEntries.filter(
        entry => entry.size === "small"
      ) as PortfolioEntry[]
    )

    return { bigPortfolioEntries, smallPortfolioEntries }
  }
})
</script>

<template>
  <div class="portfolio-list">
    <content-with-title :title="'Portfolio'">
      <div class="portfolio-list__grid">
        <parts-molecules-big-portfolio-entry v-for="entry in bigPortfolioEntries" :key="entry.id"
          class="portfolio-list__entry" :title="entry.title" :description="entry.description || null"
          :picture="entry.entryPic" :slug="entry.slug" />
      </div>
      <h3 class="portfolio-list__title">
        Other Projects
      </h3>
      <parts-molecules-small-portfolio-entry v-for="entry in smallPortfolioEntries" :key="entry.id" :title="entry.title"
        :link="entry.link" />
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
