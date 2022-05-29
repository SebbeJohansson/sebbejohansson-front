export default defineNuxtPlugin(useNuxtApp => {
  interface MediaArguments {
    maxHeight: number;
    maxWidth: number;
    skipAutoFormat?: boolean | undefined;
  }

  function toMediaUrl(url: string, { maxHeight = null, maxWidth = null, skipAutoFormat = false }: MediaArguments) {
    const qs = [];

    if (!skipAutoFormat) {
      qs.push('m/');
    }

    let imageUrl = url;

    if (qs.length) {
      imageUrl += `/${qs.join('/')}`;
    }

    return imageUrl;
  }
  // accessible directly with useNuxtApp()
  useNuxtApp.provide('toMediaUrl', toMediaUrl);
})
