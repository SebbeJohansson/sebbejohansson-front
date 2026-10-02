<script setup lang="ts">
  interface PortfolioEntry {
    id: number;
    title: string;
    description: string;
    slug: string;
    entryPic: string;
    link: string | null;
    size: string;
  }

  const route = useRoute();

  const isPreview = !!(route.query._storyblok && route.query._storyblok !== '');
  const version = isPreview ? 'draft' : 'published';

  const { stories } = await useStoryblokFetch('', {
    starts_with: 'portfolio/',
    version,
  });

  const portfolioEntries = computed<PortfolioEntry[]>(() => stories.map(story => ({
    id: story.id,
    title: story.content?.title || story.name,
    description: story.content?.description,
    slug: story.full_slug || story.content?.slug || story.slug,
    entryPic: story.content?.cover?.filename,
    link: story.content?.link?.url || story.content?.link?.cached_url || null,
    size: story.content?.size,
  })));

  const bigPortfolioEntries = computed<PortfolioEntry[]>(
    () => portfolioEntries.value.filter(entry => entry.size === 'big'),
  );

  const smallPortfolioEntries = computed<PortfolioEntry[]>(
    () => portfolioEntries.value.filter(entry => entry.size === 'small'),
  );
</script>

<template>
  <div class="portfolio-list">
    <content-with-title :title="'Portfolio'" plain heading-tag="h1">
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
      <div class="portfolio-list__others">
        <parts-molecules-small-portfolio-entry
          v-for="entry in smallPortfolioEntries"
          :key="entry.id"
          :title="entry.title"
          :link="entry.link"
        />
      </div>
    </content-with-title>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/foundation/mixins.scss";
.portfolio-list__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.portfolio-list__title {
  margin: 4rem 0 1.25rem;
  font-family: $body-font;
  font-size: 2.5rem;
  font-weight: 200;
  letter-spacing: -0.01em;
  text-align: center;
}

.portfolio-list__others {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem 1.75rem;
  max-width: 800px;
  margin: 0 auto;
}

@include mixins.for-phone-only() {
  .portfolio-list__grid {
    grid-template-columns: 1fr;
  }
}

@include mixins.for-tablet-only() {
  .portfolio-list__grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
