<template>
  <div class="desktop-menu">
    <div class="desktop-menu__container-wrapper">
      <div class="desktop-menu__container">
        <div class="desktop-menu__logo-wrapper">
          <NuxtLink href="/#" class="desktop-menu__logo">
            Sebastian Johansson
          </NuxtLink>
        </div>

        <div class="desktop-menu__departments">
          <NuxtLink href="/#portfolio" class="desktop-menu__department">
            Portfolio
          </NuxtLink>
          <NuxtLink href="/#contact" class="desktop-menu__department">
            Contact
          </NuxtLink>
          <NuxtLink to="/blog/" class="desktop-menu__department">
            Blog
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="desktop-menu__background">
      <parts-atoms-image class="desktop-menu__background-image" image="images/picnr7.jpg" loading="eager" alt="Landscape Background" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.desktop-menu {
  position: sticky;
  top: 0;
  padding: 1rem 0;
}

.desktop-menu__container-wrapper {
  position: relative;
  z-index: 10;
  background-color: rgba(219, 219, 219, 0.49);
  padding: 0 1rem;
}

.desktop-menu__container {
  width: 100%;
  height: 100%;
  display: flex;
  max-width: 1180px;
  margin: 0 auto;
  z-index: 10;
}

.desktop-menu__logo-wrapper {
  margin: 1.5rem 0;
  margin-right: 2rem;
}

.desktop-menu__logo,
.desktop-menu__department {
  display: block;
  text-decoration: none;
  color: white;
  font-family: Montserrat, Arial, sans-serif;
}

.desktop-menu__logo {
  font-weight: 600;
  font-size: 20px;
  line-height: 1;
}

.desktop-menu__departments {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.desktop-menu__department {
  padding: 1.5rem 1rem;
}

.desktop-menu__background {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  z-index: 5;
}

.desktop-menu__background-image {
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
}

@media (--phone) {
  .desktop-menu__container {
    flex-direction: column;
  }

  .desktop-menu__logo-wrapper {
    margin: 1.5rem 0;
    text-align: center;
  }
}
</style>
