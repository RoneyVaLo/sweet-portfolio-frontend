import type { RichTextBlock } from '../types';

export function richTextToPlain(desc: RichTextBlock[] | string | null): string {
  if (!desc) return '';
  if (typeof desc === 'string') return desc;
  return desc
    .map((block) => block.children.map((c) => c.text).join(''))
    .filter(Boolean)
    .join(' ');
}