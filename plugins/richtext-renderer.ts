import { defineNuxtPlugin } from '#app'
import { plugin } from '@marvr/storyblok-rich-text-vue-renderer'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(plugin(/* options */))
})
