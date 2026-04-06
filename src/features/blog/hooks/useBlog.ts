import { useState, useEffect } from "react";
import { API_Service } from "../../../lib/services/api";
import type { BlogArticle, UseAsyncResult } from "../../../types";

export function useBlog(slug: string): UseAsyncResult<BlogArticle>;
export function useBlog(slug?: undefined): UseAsyncResult<BlogArticle[]>;
export function useBlog(
  slug?: string,
): UseAsyncResult<BlogArticle | BlogArticle[]> {
  const [data, setData] = useState<BlogArticle | BlogArticle[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);
    setError(null);
    setData(null);

    const fetch = slug
      ? API_Service.getBlogArticleBySlug(slug)
      : API_Service.getBlogArticles();

    fetch
      .then(setData)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [slug]);

  return { data, loading, error };
}
