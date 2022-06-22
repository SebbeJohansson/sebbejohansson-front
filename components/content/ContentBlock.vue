<template>
  <div class="content-block">
    <slot />
  </div>
</template>

<style scoped>
.content-block {
  width: 100%;
  max-width: 1300px;
  padding: 30px;
  margin: 10px auto 10px;
  font-family: Roboto, Helvetica, Arial, Verdana, sans-serif;
  background-color: white;
  border-bottom: 1px solid rgb(206, 206, 206);
  box-shadow: 0 0 3px #c0c1c2;
}

@media (--phoneAndTablet) {
  .content-block {
    padding: 15px;
  }
}
</style>
