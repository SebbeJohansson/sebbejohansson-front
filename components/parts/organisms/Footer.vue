<template>
  <div class="footer">
    <div id="contact" class="footer__left">
      <parts-atoms-image
        class="footer__left-icon"
        image="images/icon.png"
        alt="SebbeJohansson Icon"
        :mobile-size="60"
        :tablet-size="60"
        :desktop-size="60"
      />
      <a class="footer__address" href="mailto:hello@sebbejohansson.com">hello@sebbejohansson.com</a>
    </div>
    <div class="footer__right">
      <p class="footer__right-text">
        designed and developed by Sebastian Johansson
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/foundation/mixins.scss";
.footer {
  background-color: $cover-dark;
  border-bottom: 1px solid $border-dark;
  box-shadow: 0 0 3px $shadow-dark;
  min-height: 100px;
  width: 100%;
  margin-top: auto;
  display: flex;
}

.footer__right {
  padding: 2rem 0;
  width: 50%;
  display: flex;
  align-items: center;
}

.footer__right-text {
  margin: 0 auto;
  font-family: Montserrat, Arial, sans-serif;
  color: white;
  font-weight: 100;
  text-align: right;
  margin-right: 30px;
  width: 100%;
}

.footer__left {
  width: 50%;
  border-right: 1px dimgray solid;
  padding: 2rem 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}

.footer__left-icon {
  width: 60px;
  height: 60px;
  filter: invert(100%);
  margin-left: 20px;
  float: left;
}

.footer__address {
  font-size: 16px;
  font-family: Montserrat, Arial, sans-serif;
  color: white;
  font-weight: 100;
  text-decoration: none;
  margin-left: 45px;
}

.footer__address:hover {
  text-decoration: underline;
}

@include mixins.for-phone-only() {
  .footer {
    flex-direction: column;
  }

  .footer__left {
    width: 100%;
    border-bottom: 1px solid #696969;
    border-right: none;
  }

  .footer__right {
    width: 100%;
  }

  .footer__right-text {
    text-align: center;
    margin-right: 0;
  }
}
</style>
