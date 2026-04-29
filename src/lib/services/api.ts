import type {
  Post,
  Profile,
  BlogArticle,
  FaqItem,
  StrapiResponse,
  ImageData,
} from "../../types";

const API_URL = import.meta.env.VITE_API_URL as string | undefined;

if (!API_URL) {
  throw new Error("VITE_API_URL is not defined");
}

// --- Utility helpers ---

export function normalizeStrapi<T extends object>(
  raw: { id: number; attributes?: T } & Partial<T>,
): { id: number } & T {
  const { id, attributes, ...rest } = raw as {
    id: number;
    attributes?: T;
  } & Record<string, unknown>;
  // Strapi v5 returns fields flat (no attributes), v4 uses attributes
  return { id, ...(attributes ?? rest) } as { id: number } & T;
}

export function resolveImageUrl(url: string, base: string): string {
  if (url.startsWith("/")) {
    return `${base}${url}`;
  }
  return url;
}

export function buildWhatsAppLink(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

// --- Internal fetch helper ---

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  if (!res.ok) {
    throw new Error(`HTTP error: ${res.status}`);
  }
  return res.json() as Promise<T>;
}

// --- Image normalization ---

function normalizeImage(img: ImageData): ImageData {
  return { ...img, url: resolveImageUrl(img.url, API_URL!) };
}

// --- API_Service singleton ---

export const API_Service = {
  async getPosts(): Promise<Post[]> {
    const response = await apiFetch<{ data: Record<string, unknown>[] }>(
      "/api/posts?populate=*",
    );
    const items = Array.isArray(response.data)
      ? response.data
      : [response.data];
    return items.map((item) => {
      const normalized = normalizeStrapi(
        item as { id: number } & Record<string, unknown>,
      );
      // Strapi returns the media field as "image" (array); normalize to "images"
      const rawImages = (normalized as Record<string, unknown>).image;
      const imagesArray = Array.isArray(rawImages)
        ? rawImages
        : rawImages
          ? [rawImages]
          : [];
      return {
        id: normalized.id,
        description:
          ((normalized as Record<string, unknown>).description as string) ?? "",
        images: imagesArray.map((img) => normalizeImage(img as ImageData)),
      };
    });
  },

  async getProfile(): Promise<Profile> {
    const response = await apiFetch<StrapiResponse<Omit<Profile, "id">>>(
      "/api/profile?populate=*",
    );
    const item = Array.isArray(response.data)
      ? response.data[0]
      : response.data;
    const normalized = normalizeStrapi(item);
    return {
      ...normalized,
      profileImage: normalized.profileImage
        ? normalizeImage(normalized.profileImage)
        : null,
    };
  },

  async getBlogArticles(): Promise<BlogArticle[]> {
    const response = await apiFetch<StrapiResponse<Omit<BlogArticle, "id">>>(
      "/api/blogs?populate=*",
    );
    const items = Array.isArray(response.data)
      ? response.data
      : [response.data];
    return items.map((item) => {
      const normalized = normalizeStrapi(item);
      return {
        ...normalized,
        coverImage: normalized.coverImage
          ? normalizeImage(normalized.coverImage)
          : null,
      };
    });
  },

  async getFaqs(): Promise<FaqItem[]> {
    const response = await apiFetch<{ data: Record<string, unknown>[] }>(
      "/api/faqs?sort=order:asc",
    );
    const items = Array.isArray(response.data)
      ? response.data
      : [response.data];
    return items.map((item) => {
      const normalized = normalizeStrapi(
        item as { id: number } & Record<string, unknown>,
      );
      return {
        id: normalized.id,
        question:
          ((normalized as Record<string, unknown>).question as string) ?? "",
        answer:
          ((normalized as Record<string, unknown>).answer as string) ?? "",
      };
    });
  },

  async getBlogArticleBySlug(slug: string): Promise<BlogArticle> {
    const response = await apiFetch<StrapiResponse<Omit<BlogArticle, "id">>>(
      `/api/blogs?slug=${slug}&populate=*`,
    );
    const items = Array.isArray(response.data)
      ? response.data
      : [response.data];
    if (items.length === 0) {
      throw new Error(`Blog article not found: ${slug}`);
    }
    const normalized = normalizeStrapi(items[0]);
    return {
      ...normalized,
      coverImage: normalized.coverImage
        ? normalizeImage(normalized.coverImage)
        : null,
    };
  },
};
