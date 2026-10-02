<script setup lang="ts">
  defineProps<{
    title: string;
  }>();
</script>

<template>
  <div class="content-with-title">
    <content-block>
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
</style>
