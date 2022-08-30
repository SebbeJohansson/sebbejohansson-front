export default defineNuxtPlugin((useNuxtApp) => {
  /* Resolves the storyblok component */
  // It is needed so that the components are rendered on the server instead of the client.
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
