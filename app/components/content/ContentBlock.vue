<template>
  <div class="content-block">
    <div class="content-block__content">
      <slot />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/foundation/mixins.scss";
.content-block {
  @include mixins.content-width();
  padding: 0;
  &__content {
    padding: 1.5rem;
    margin: 1rem 1rem;
    font-family: $ui-font;
    background-color: $cover-dark;
    border: 1px solid $border-dark;
    border-radius: 10px;
  }
}
</style>
