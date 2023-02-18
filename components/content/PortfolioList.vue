<script setup async lang="ts">

  interface PortfolioEntry {
    id: number,
    title: string;
    description: string;
    slug: string;
    entryPic: string;
    link: string;
    size: string;
  }

  const route = useRoute();

  const isPreview = !!(route.query._storyblok && route.query._storyblok !== '');
  const version = isPreview ? 'draft' : 'published';

  const rawPortfolioEntries: PortfolioEntry[] = [];

  await useStoryblokFetch('', {
    starts_with: 'portfolio/',
    version,
  }).then((response) => {
    response.stories.forEach((story) => {
      rawPortfolioEntries.push({
        id: story.id,
        title: story.content.title || story.name,
        description: story.content.description,
        slug: story.full_slug || story.content.slug || story.slug,
        entryPic: story.content.cover?.filename,
        link: story.content.link?.url || story.content.link?.url || null,
        size: story.content.size,
      });
    });
  });

  const bigPortfolioEntries = computed<PortfolioEntry[]>(
    (): PortfolioEntry[] => rawPortfolioEntries.filter(
      entry => entry.size === 'big',
    ) as PortfolioEntry[],
  );

  const smallPortfolioEntries = computed<PortfolioEntry[]>(
    (): PortfolioEntry[] => rawPortfolioEntries.filter(
      entry => entry.size === 'small',
    ) as PortfolioEntry[],
  );
</script>

<template>
  <div class="portfolio-list">
    <content-with-title :title="'Portfolio'">
      <div class="portfolio-list__grid">
        <parts-molecules-big-portfolio-entry
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
      <parts-molecules-small-portfolio-entry
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
