<template>
  <div class="content-block">
    <slot />
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/foundation/mixins.scss";
.content-block {
  @include mixins.content-width();
  padding: 1rem;
  margin: 1rem 1rem;
  font-family: Roboto, Helvetica, Arial, Verdana, sans-serif;
  background-color: $cover-dark;
  border-bottom: 1px solid $border-dark;
  box-shadow: 0 0 3px $shadow-dark;
}
</style>
