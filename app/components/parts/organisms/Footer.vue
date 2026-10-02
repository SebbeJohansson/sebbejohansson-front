<template>
  <div class="footer">
    <div class="footer__inner">
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
      <p class="footer__right-text">
        designed and developed by Sebastian Johansson
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/foundation/mixins.scss";
.footer {
  width: 100%;
  margin-top: auto;
  background-color: $cover-dark;
  border-top: 1px solid $border-dark;
}

.footer__inner {
  @include mixins.content-width();
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding-top: 1.75rem;
  padding-bottom: 1.75rem;
}

.footer__left {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.footer__left-icon {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  filter: invert(100%);
}

.footer__address {
  font-family: $heading-font;
  font-size: 15px;
  font-weight: 500;
  color: $text-color;
  text-decoration: underline;
  text-underline-offset: 3px;
  &:hover {
    text-decoration: none;
  }
}

.footer__right-text {
  margin: 0;
  font-family: $heading-font;
  font-size: 14px;
  font-weight: 400;
  color: $text-muted;
  text-align: right;
}

@include mixins.for-phone-only() {
  .footer__inner {
    flex-direction: column;
    gap: 1rem;
  }

  .footer__right-text {
    text-align: center;
  }
}
</style>
