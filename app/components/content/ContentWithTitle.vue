<script setup lang="ts">
  withDefaults(defineProps<{
    title: string;
    // Renders without the surrounding card, for content that has its own cards.
    plain?: boolean;
  }>(), {
    plain: false,
  });
</script>

<template>
  <div class="content-with-title" :class="{ 'content-with-title--plain': plain }">
    <div v-if="plain" class="content-with-title__plain">
      <h2 class="content-with-title__title">
        {{ title }}
      </h2>
      <div class="content-with-title__content">
        <slot />
      </div>
    </div>
    <content-block v-else>
      <h2 class="content-with-title__title">
        {{ title }}
      </h2>
      <div class="content-with-title__content">
        <slot />
      </div>
    </content-block>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/foundation/mixins.scss";
.content-with-title__title {
  margin: 0 0 1.5rem;
  font-family: $body-font;
  font-size: clamp(3rem, 2rem + 3vw, 4.5rem);
  font-weight: 200;
  letter-spacing: -0.02em;
  line-height: 1;
  text-align: center;
}

.content-with-title__content {
  text-align: center;
}

.content-with-title__plain {
  @include mixins.content-width();
  width: 100%;
  padding-top: 3.5rem;
  padding-bottom: 3.5rem;
  box-sizing: border-box;
}

.content-with-title--plain .content-with-title__title {
  margin-bottom: 2.5rem;
}
</style>
