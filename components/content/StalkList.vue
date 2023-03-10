<script setup async lang="ts">

  interface StalkEntry {
    id: number;
    link: string;
    entryPic: string;
    name: string;
  }

  const route = useRoute();

  const isPreview = !!(route.query._storyblok && route.query._storyblok !== '');
  const version = isPreview ? 'draft' : 'published';

  const rawStalkEntries: StalkEntry[] = [];

  await useStoryblokFetch('', {
    starts_with: 'contact/',
    version,
  }).then((response) => {
    response.stories.forEach((story) => {
      rawStalkEntries.push({
        id: story.id,
        entryPic: story.content.image?.filename,
        link: story.content.link?.url || story.content.link?.url || null,
        name: story.name,
      });
    });
  });

  const stalkEntries = computed<StalkEntry[]>(
    (): StalkEntry[] => rawStalkEntries as StalkEntry[],
  );
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
  border-bottom: none;
  max-width: 50%;
  border-top-left-radius: 60px;
  border-top-right-radius: 60px;
  padding: 30px;
  margin: 0 auto;
  box-shadow: 0 0 3px color.invert($shadow-dark, $weight: 100%);
  background-color: color.invert($background-dark, $weight: 100%);
  margin-top: 30px;
  margin-bottom: -10px;
}

.stalk-list__title {
  margin: 0px;
  text-align: center;
  font-family: raleway, Helvetica, Arial, Verdana, sans-serif;
  font-size: 2em;
  font-weight: 200;
  margin-top: 10px;
  color: color.invert($text-color, $weight: 100%);
}

.stalk-list__grid {
  display: flex;
}

@include mixins.for-phone-and-tablet-only() {
  .stalk-list {
    max-width: 100%;
    padding: 6px;
  }
}
</style>
