export default defineNuxtPlugin(useNuxtApp => {
  interface MediaArguments {
    maxHeight: number;
    maxWidth: number;
    skipAutoFormat?: boolean | undefined;
  }

  function toMediaUrl(slug: string, { maxHeight, maxWidth, skipAutoFormat = false }: MediaArguments) {
    const qs = [];

    if (!skipAutoFormat) {
      qs.push('auto=format');
    }

    let imageUrl = `https://sebbejohansson.imgix.net/${slug}`;

    if (qs.length) {
      imageUrl += `?${qs.join('&')}`;
    }

    return imageUrl;
  }
  // accessible directly with useNuxtApp()
  useNuxtApp.provide('toMediaUrl', toMediaUrl);
})

/* import { Plugin } from '@nuxt/types';

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $toMediaUrl(slug: string, args: MediaArguments): string
  }
  interface Context {
    $toMediaUrl(slug: string, args: MediaArguments): string
  }
}

const mediaHandler: Plugin = (context, inject) => {
  context.$toMediaUrl = toMediaUrl;
  inject('toMediaUrl', toMediaUrl);
};

export default mediaHandler;

*/
