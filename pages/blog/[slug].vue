<script setup lang="ts">
const route = useRoute();
// let story = {} as any;
const version = route.query._storyblok && route.query._storyblok != '' ? 'draft' : 'published';
/* await useStoryblok(`blog/${route.params.slug}`, { version }).then((response) => {
  story = response.value;
}); */
console.log(version);
const story = ref(null);

// TODO:
// if in preview, pull using normal useStoryblok
// otherwise pull using useAsyncData straight from the api instead so that we are doing it on the server.


// const storyblokApi = useStoryblokApi();
// const { data } = await storyblokApi.get(`cdn/stories/blog/${route.params.slug}`, {
//   version: version
// });
// console.log(data);
// story.value = data.story;
const blogTitle = computed((): string => story.content?.title || story.name || 'wow');

useHead({
  titleTemplate: title => `${blogTitle.value} - ${title}`,
});
</script>

<template>
  <div class="page blog-entry-page" v-if="story">
    <component :is="$resolveStoryBlokComponent(story)" :blok="story.content" :raw="story" />
  </div>
</template>

<style scoped>
.blog-entry-page {
  width: 100%;
  max-width: 1300px;
  margin: 10px auto;
  padding-top: 10px;
  padding-bottom: 10px;
}
</style>
