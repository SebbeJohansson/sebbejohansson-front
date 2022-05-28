<template>
  <div class="footer">
    <div id="contact" class="footer__left">
      <img class="footer__left-icon" src="/images/icon.png" loading="lazy">
      <a class="footer__address" href="mailto:hello@sebbejohansson.com">hello@sebbejohansson.com</a>
    </div>
    <div class="footer__right">
      <p class="footer__right-text">
        designed and developed by Sebastian Johansson
      </p>
    </div>
  </div>
</template>

<style scoped>
.footer {
  background: #1f1f1f;
  min-height: 100px;
  width: 100%;
  margin-top: auto;
  display: flex;
}

.footer__right {
  height: 100px;
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
  height: 100px;
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

@media (--phone) {
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
