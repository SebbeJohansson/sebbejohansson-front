// The teaser shown for a post in the blog listing: its first few sentences and first image.

export interface BlogExcerpt {
  text: string;
  image: { src: string; alt: string } | undefined;
}

const MAX_SENTENCES = 3;
const MAX_LENGTH = 320;

// Paragraphs in these do not read well as running text, though their images still count.
const NO_TEXT_TYPES = ['bullet_list', 'ordered_list', 'blockquote', 'table'];

function inlineText(nodes: any[] = []): string {
  return nodes.map(node => (node.type === 'hard_break' ? ' ' : node.text ?? '')).join('');
}

function shorten(text: string): string {
  const sentences = text.match(/.+?(?:[.!?]+["')\]]*(?=\s|$)|$)/g) ?? [];

  let result = '';
  for (const sentence of sentences.slice(0, MAX_SENTENCES)) {
    if ((result + sentence).trim().length > MAX_LENGTH) { break; }
    result += sentence;
  }
  if (result) { return result.trim(); }

  // Not even the first sentence fits, so cut it between two words.
  const cut = text.slice(0, MAX_LENGTH + 1);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : MAX_LENGTH)}…`;
}

/**
 * Walks a blog entry's bloks and rich text in reading order. Code blocks, gists and
 * headings are left out. `content` is a plain string on entries without bloks.
 */
export function getBlogExcerpt(content: unknown): BlogExcerpt {
  const paragraphs: string[] = typeof content === 'string' ? [content] : [];
  let image: BlogExcerpt['image'];

  function walk(node: any, takeText: boolean) {
    if (Array.isArray(node)) {
      node.forEach(child => walk(child, takeText));
      return;
    }
    if (!node || typeof node !== 'object' || node.type === 'code_block') { return; }

    if (node.type === 'image') {
      if (!image && node.attrs?.src) {
        image = { src: node.attrs.src, alt: node.attrs.alt || '' };
      }
      return;
    }

    if (node.type === 'paragraph' && takeText) {
      paragraphs.push(inlineText(node.content));
    }

    const childTakesText = takeText && !NO_TEXT_TYPES.includes(node.type);
    // `content`: bloks and rich text nodes, `text`: text blok, `attrs.body`: inline bloks.
    [node.content, node.text, node.attrs?.body].forEach(child => walk(child, childTakesText));
  }

  walk(content, true);

  return {
    text: shorten(paragraphs.join(' ').replace(/\s+/g, ' ').trim()),
    image,
  };
}
