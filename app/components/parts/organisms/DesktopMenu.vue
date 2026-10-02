<script setup lang="ts">
  const route = useRoute();

  // Detail pages are siblings of the list pages (not nested routes), so match on the path prefix.
  const isActive = (prefix: string): boolean => route.path.startsWith(prefix);
</script>

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
          <NuxtLink href="/portfolio" class="desktop-menu__department" :class="{ 'desktop-menu__department--active': isActive('/portfolio') }">
            Portfolio
          </NuxtLink>
          <NuxtLink href="/#contact" class="desktop-menu__department">
            Contact
          </NuxtLink>
          <NuxtLink to="/blog/" class="desktop-menu__department" :class="{ 'desktop-menu__department--active': isActive('/blog') }">
            Blog
          </NuxtLink>
        </div>
      </div>
    </div>
    <div v-if="false" class="desktop-menu__background">
      <parts-atoms-image class="desktop-menu__background-image" image="images/picnr7.jpg" loading="eager" alt="Landscape Background" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@use "@/assets/styles/foundation/mixins.scss";
.desktop-menu {
  position: sticky;
  top: 0;
  z-index: 10;
}

.desktop-menu__container-wrapper {
  position: relative;
  z-index: 10;
  background-color: black;
  border-bottom: 1px solid rgba($text-color, 0.08);
}

.desktop-menu__container {
  @include mixins.content-width();
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 64px;
}

.desktop-menu__logo,
.desktop-menu__department {
  display: block;
  font-family: $heading-font;
  text-decoration: none;
}

.desktop-menu__logo {
  font-size: 18px;
  font-weight: 600;
  letter-spacing: -0.01em;
  line-height: 1;
  color: $text-color;
}

.desktop-menu__departments {
  display: flex;
  gap: 2rem;
  height: 100%;
}

.desktop-menu__department {
  position: relative;
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 15px;
  font-weight: 500;
  color: $text-muted;
  transition: color 0.15s ease;
  &:hover {
    color: $text-color;
  }
  &:focus-visible {
    outline: 2px solid $text-color;
    outline-offset: -2px;
    border-radius: 2px;
  }
}

.desktop-menu__department--active {
  color: $text-color;
  &::after {
    content: '';
    position: absolute;
    right: 0;
    bottom: -1px;
    left: 0;
    height: 2px;
    background-color: $text-color;
  }
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

@include mixins.for-phone-only() {
  .desktop-menu__container {
    flex-direction: column;
    justify-content: flex-start;
    gap: 4px;
    height: auto;
    padding-top: 14px;
  }

  .desktop-menu__logo {
    font-size: 17px;
  }

  .desktop-menu__departments {
    height: 44px;
  }
}
</style>
