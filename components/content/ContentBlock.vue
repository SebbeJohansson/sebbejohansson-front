<template>
  <div class="content-block">
    <slot />
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/foundation/mixins.scss";
.content-block {
  @include mixins.content-width();
  padding: 30px;
  margin: 10px auto 10px;
  font-family: Roboto, Helvetica, Arial, Verdana, sans-serif;
  background-color: $cover-color;
  border-bottom: 1px solid $border-dark;
  box-shadow: 0 0 3px $shadow-dark;
}

@media (--phoneAndTablet) {
  .content-block {
    padding: 15px;
  }
}
</style>
