import type { RouterConfig } from '@nuxt/schema';
// https://router.vuejs.org/api/#routeroptions
export default <RouterConfig>{
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash };
    }

    if (savedPosition) {
      return savedPosition;
    }

    return { x: 0, y: 0 };
  },
  trailingSlash: true,
};
