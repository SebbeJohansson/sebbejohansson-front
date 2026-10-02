<script setup lang="ts">
  interface StalkEntry {
    id: number;
    link: string | null;
    entryPic: string;
    name: string;
  }

  const route = useRoute();

  const isPreview = !!(route.query._storyblok && route.query._storyblok !== '');
  const version = isPreview ? 'draft' : 'published';

  const { stories } = await useStoryblokFetch('', {
    starts_with: 'contact/',
    version,
  });

  const stalkEntries = computed<StalkEntry[]>(() => stories.map(story => ({
    id: story.id,
    entryPic: story.content?.image?.filename,
    link: story.content?.link?.url || story.content?.link?.cached_url || null,
    name: story.name,
  })));
</script>

<template>
  <div class="stalk-list">
    <h3 class="stalk-list__title">
      Find me
    </h3>
    <div class="stalk-list__grid">
      <parts-molecules-stalk-entry
        v-for="entry in stalkEntries"
        :key="entry.id"
        :link="entry.link"
        :picture="entry.entryPic"
        :name="entry.name"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "sass:color";
@use "@/assets/styles/foundation/mixins.scss";
.stalk-list {
  position: relative;
  z-index: 1;
  width: fit-content;
  max-width: calc(100% - 2rem);
  margin: 3rem auto -1px;
  padding: 28px 40px 32px;
  border-radius: 28px 28px 0 0;
  background-color: color.invert($background-dark, $weight: 100%);
}

.stalk-list__title {
  margin: 0 0 18px;
  font-family: $body-font;
  font-size: 1.75rem;
  font-weight: 200;
  letter-spacing: -0.01em;
  text-align: center;
  color: color.invert($text-color, $weight: 100%);
}

.stalk-list__grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

@include mixins.for-phone-only() {
  .stalk-list {
    padding: 24px 20px 28px;
  }

  .stalk-list__grid {
    gap: 12px;
  }
}
</style>
