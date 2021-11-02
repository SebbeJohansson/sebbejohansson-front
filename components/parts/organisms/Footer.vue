<script setup lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({});
</script>

<template>
  <div class="footer">
    <div class="footer__left" id="contact">
      <img class="footer__left-icon" src="/images/icon.png"/>
      <a class="footer__address" href="mailto:hello@sebbejohansson.com">hello@sebbejohansson.com</a>
    </div>
    <div class="footer__right">
      <p class="footer__right-text">designed and developed by Sebastian Johansson</p>
    </div>
  </div>
</template>

<style scoped>
.footer {
  background: #1f1f1f;
  min-height: 100px;
  width: 100%;
  margin-top: auto;
}

.footer__right {
  float: right;
  height: 100px;
  width: 49%;
}

.footer__right-text {
  margin: 0 auto;
  font-family: Montserrat, Arial, sans-serif;
  color: white;
  font-weight: 100;
  margin: 45px 30px 0px 10px;
  float: right;
}

.footer__left {
  float: left;
  width: 50%;
  border-right: 1px dimgray solid;
  height: 100px;
}

.footer__left-icon {
  width: 60px;
  -webkit-filter: invert(100%);
  margin: 20px 10px 10px 20px;
  float: left;
}

.footer__address {
  font-size: 16px;
  float: left;
  font-family: Montserrat, Arial, sans-serif;
  color: white;
  font-weight: 100;
  text-decoration: none;
  margin: 45px 0px 0px 20px;
}
.footer__address:hover{
  text-decoration: underline;
}
</style>