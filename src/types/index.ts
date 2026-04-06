export interface ImageData {
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
}

export interface Post {
  id: number;
  images: ImageData[];
  description: string;
}

export interface RichTextChild {
  text: string;
  type: string;
}

export interface RichTextBlock {
  type: string;
  children: RichTextChild[];
}

export interface Profile {
  id: number;
  name: string;
  description: RichTextBlock[] | string | null;
  profileImage: ImageData | null;
  whatsapp: string | null;
  instagram: string | null;
  facebook: string | null;
  location: string | null;
}

export interface BlogArticle {
  id: number;
  title: string;
  slug: string;
  content: string;
  coverImage: ImageData | null;
}

export interface StrapiResponse<T> {
  data: { id: number; attributes: T } | Array<{ id: number; attributes: T }>;
  meta: object;
}

export interface UseAsyncResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}
