import { Plugin } from '@nuxt/types';

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $toMediaUrl(slug: string, args: MediaArguments): string
  }
  interface Context {
    $toMediaUrl(slug: string, args: MediaArguments): string
  }
}

interface MediaArguments {
  maxHeight: number;
  maxWidth: number;
  skipAutoFormat?: boolean | undefined;
}

function toMediaUrl(slug: string, { maxHeight, maxWidth, skipAutoFormat = false }: MediaArguments) {
  const qs = [];

  /* if (maxWidth) {
    qs.push(`maxWidth=${Math.round(maxWidth)}`);
  }

  if (maxHeight) {
    qs.push(`maxHeight=${Math.round(maxHeight)}`);
  } */

  if (!skipAutoFormat) {
    qs.push('auto=format');
  }

  let imageUrl = `https://sebbejohansson.imgix.net/${slug}`;

  if (qs.length) {
    imageUrl += `?${qs.join('&')}`;
  }

  return imageUrl;
}

const mediaHandler: Plugin = (context, inject) => {
  context.$toMediaUrl = toMediaUrl;
  inject('toMediaUrl', toMediaUrl);
};

export default mediaHandler;
