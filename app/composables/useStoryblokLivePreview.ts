import type { Ref } from 'vue';
import type { StoryblokStory } from '#shared/utils/storyblok';

/**
 * Connects a page's story to the Storyblok Visual Editor.
 *
 * A prerendered page hydrates with the route it was generated for, so `route.query` has
 * no `_storyblok` during setup and the published story (without `_editable`) is rendered.
 * Once Nuxt finishes hydration, this fetches the draft when the server did not, and bumps `renderKey` so
 * the blok tree remounts: `v-editable` only sets its attributes on mount, and the bridge
 * needs them for click-to-edit.
 */
export function useStoryblokLivePreview(
  story: Ref<StoryblokStory | undefined>,
  slug: string,
  options: { draftLoaded: boolean; resolveRelations?: string },
) {
  const renderKey = ref(0);

  onNuxtReady(async () => {
    if (!new URLSearchParams(window.location.search).has('_storyblok')) { return; }

    if (!options.draftLoaded) {
      const response = await useStoryblokApi().get(`cdn/stories/${slug}`, {
        version: 'draft',
        resolve_relations: options.resolveRelations,
      });
      if (response?.data?.story) {
        story.value = response.data.story;
        renderKey.value++;
      }
    }

    if (!story.value?.id) { return; }

    await nextTick();

    // The bridge is bundled and loaded asynchronously, so `window.StoryblokBridge` may not
    // exist yet. This waits for it.
    useStoryblokBridge(story.value.id, (newStory) => {
      story.value = newStory as StoryblokStory;
    }, { resolveRelations: options.resolveRelations });
  });

  return { renderKey };
}
