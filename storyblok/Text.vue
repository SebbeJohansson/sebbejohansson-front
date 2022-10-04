<script setup lang="ts">
import { Richtext } from 'storyblok-js-client';

const props = defineProps({ blok: Object });
const nuxtApp = useNuxtApp();
const textObject = { ...props.blok.text };
const nodes = [];
// Proof of concept for custom handling of inline blok nodes.
Object.entries(textObject.content).forEach(([key, node]) => {
  if (node.type === 'blok') {
    const blok = {
      content: node.attrs?.body?.[0],
    };
    nodes.push({
      key,
      type: 'blok',
      content: {
        blok,
      },
    });
  } else {
    nodes.push({
      key,
      type: 'html',
      content: nuxtApp.$formatRichText(useStoryblokApi().richTextResolver.render({
        type: 'doc',
        content: [
          node,
        ],
      } as Richtext)),
    });
  }
});
</script>

<template>
  <div v-editable="blok" class="text">
    <div v-for="node in nodes" :key="node.key">
      <component
        :is="$resolveStoryBlokComponent(node.content.blok)"
        v-if="node.type === 'blok'"
        :blok="node.content.blok.content"
      />
      <div v-else v-html="node.content" />
    </div>
  </div>
</template>

<style>
.text img {
  max-width: 100%;
}
</style>
