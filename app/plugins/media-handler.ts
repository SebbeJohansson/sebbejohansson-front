export default defineNuxtPlugin(() => {
  interface MediaArguments {
    maxHeight?: number | null;
    maxWidth?: number | null;
    skipAutoFormat?: boolean;
  }

  function toMediaUrl(url: string, { maxHeight = null, maxWidth = null, skipAutoFormat = false }: MediaArguments = {}) {
    if (url.startsWith('https://') || url.startsWith('http://')) {
      return formatStoryblokImage(url);
    }

    return formatNativeImage(url);

    function formatStoryblokImage(image: string) {
      const qs: string[] = [];

      if (!skipAutoFormat) {
        qs.push('m');
      }

      if (maxWidth || maxHeight) {
        qs.push(`${maxWidth || 0}x${maxHeight || 0}`);
      }

      let imageUrl = image;

      if (qs.length) {
        imageUrl += `/${qs.join('/')}/`;
      }
      return imageUrl;
    }

    function formatNativeImage(slug: string) {
      const qs: string[] = [];

      if (!skipAutoFormat) {
        qs.push('auto=format');
      }

      if (maxHeight) {
        qs.push(`h=${maxHeight}`);
      }
      if (maxWidth) {
        qs.push(`w=${maxWidth}`);
      }

      let imageUrl = `https://sebbejohansson.imgix.net/${slug}`;

      if (qs.length) {
        imageUrl += `?${qs.join('&')}`;
      }
      return imageUrl;
    }
  }

  function formatRichText(richText: string | null | undefined): string | null {
    if (!richText || typeof richText.replace !== 'function') { return null; }
    // Lazy-load every image that comes out of the rich text renderer.
    const regex = /(?<start><img)(?<middle>.*?)(?<end>\/?>)/gi;
    return richText.replace(
      regex,
      (...args) => {
        const namedGroups = args[args.length - 1] as Record<string, string>;
        return `${namedGroups.start} loading="lazy" ${namedGroups.middle} ${namedGroups.end}`;
      },
    );
  }

  return {
    provide: {
      formatRichText,
      toMediaUrl,
    },
  };
});
