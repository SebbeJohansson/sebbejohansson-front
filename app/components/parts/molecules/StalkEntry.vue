<script setup lang="ts">
  const props = defineProps<{
    picture: string;
    link: string | null;
    name: string;
  }>();

  const imageUrl = computed((): string => (props.picture ? props.picture : 'null'));
  const entryUrl = computed((): string | undefined => (props.link ? `https://${props.link}` : undefined));
</script>

<template>
  <div v-if="entryUrl" class="stalk-entry">
    <a :href="entryUrl" target="_blank" class="stalk-entry__container">
      <parts-atoms-image
        class="stalk-entry__image"
        :image="imageUrl"
        :alt="`${name} Icon`"
        :mobile-size="100"
        :tablet-size="100"
        :desktop-size="100"
      />
    </a>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/foundation/mixins.scss";
.stalk-entry {
  width: 56px;
  @include mixins.for-phone-only() {
    width: 48px;
  }
}

.stalk-entry__container {
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  transition: transform 0.2s cubic-bezier(0.22, 1, 0.36, 1);
  &:hover {
    transform: translateY(-3px);
  }
  &:focus-visible {
    outline: 2px solid $background-dark;
    outline-offset: 3px;
  }
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}

.stalk-entry__image {
  width: 100%;
  height: auto;
  border-radius: 100%;
  overflow: hidden;
  :deep(img) {
    display: block;
    width: 100%;
    height: auto;
  }
}
</style>
