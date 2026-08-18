export default defineNuxtPlugin(() => {
  /* Resolves the storyblok component */
  // It is needed so that the components are rendered on the server instead of the client.
  function resolveStoryBlokComponent(story?: Record<string, any> | null) {
    const name = story?.component || story?.content?.component;
    if (!name) { return null; }
    return resolveComponent(name);
  }

  return {
    provide: {
      resolveStoryBlokComponent,
    },
  };
});
