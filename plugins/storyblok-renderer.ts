export default defineNuxtPlugin((useNuxtApp) => {
  function resolveStoryBlokComponent(story) {
    if (!story) { return null; }
    return resolveComponent(story?.component || story?.content?.component);
  }

  return {
    provide: {
      resolveStoryBlokComponent,
    },
  };
});
