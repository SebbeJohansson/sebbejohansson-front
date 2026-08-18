<script setup lang="ts">
  import type { SbRichTextNode } from '@storyblok/vue';

  interface TextNode {
    key: string;
    type: 'blok' | 'html';
    blok?: { content: Record<string, any> };
    html?: string;
  }

  const props = defineProps<{ blok: Record<string, any> }>();
  const nuxtApp = useNuxtApp();

  const nodes = computed<TextNode[]>(() => {
    const content = props.blok?.text?.content;
    if (!content || !Array.isArray(content)) { return []; }

    // Inline bloks are rendered as Vue components, everything else goes through the
    // Storyblok rich text renderer one node at a time.
    return content.map((node: SbRichTextNode, index: number): TextNode => {
      if (node.type === 'blok') {
        return {
          key: String(index),
          type: 'blok',
          blok: { content: (node.attrs as any)?.body?.[0] },
        };
      }

      return {
        key: String(index),
        type: 'html',
        html: nuxtApp.$formatRichText(renderRichText({ type: 'doc', content: [node] })) ?? '',
      };
    });
  });
</script>

<template>
  <div v-editable="blok" class="text">
    <div v-for="node in nodes" :key="node.key">
      <component
        :is="$resolveStoryBlokComponent(node.blok)"
        v-if="node.type === 'blok' && node.blok?.content"
        :blok="node.blok.content"
      />
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-else v-html="node.html" />
    </div>
  </div>
</template>

<style>
.text img {
  max-width: 100%;
}
</style>
