<script setup async lang="ts">

interface StalkEntry {
  id: number;
  link: string;
  entryPic: string;
}

// const route = useRoute();
// const version = route.query._storyblok && route.query._storyblok != '' ? 'draft' : 'published';

// const rawStalkEntries: StalkEntry[] = [];
// const storyblokApi = useStoryblokApi();
// await storyblokApi.get('cdn/stories', {
//   starts_with: 'contact/',
//   version,
// }).then((response) => {
//   response.data.stories.forEach((story) => {
//     rawStalkEntries.push({
//       entryPic: story.content.image?.filename,
//       link: story.content.link?.url || story.content.link?.url || null,
//     });
//   });
// });

const route = useRoute();

const isPreview = !!(route.query._storyblok && route.query._storyblok !== '');
const version = isPreview ? 'draft' : 'published';

const rawStalkEntries: StalkEntry[] = [];

await useStoryblokFetch('', {
  starts_with: 'contact/',
  version,
}).then((response) => {
  console.log(response);
  response.stories.forEach((story) => {
    rawStalkEntries.push({
      id: story.id,
      entryPic: story.content.image?.filename,
      link: story.content.link?.url || story.content.link?.url || null,
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
      Contact me
    </h3>
    <div class="stalk-list__grid">
      <parts-molecules-stalk-entry
        v-for="entry in stalkEntries"
        :key="entry.id"
        :link="entry.link"
        :picture="entry.entryPic"
      />
    </div>
  </div>
</template>

<style scoped>
.stalk-list {
  border-bottom: none;
  max-width: 50%;
  border-top-left-radius: 60px;
  border-top-right-radius: 60px;
  padding: 30px;
  margin: 0 auto;
  box-shadow: 0 0 3px #c0c1c2;
  background-color: white;
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
}

.stalk-list__grid {
  display: flex;
}

@media (--phoneAndTablet) {
  .stalk-list {
    max-width: 100%;
    padding: 6px;
  }
}
</style>
