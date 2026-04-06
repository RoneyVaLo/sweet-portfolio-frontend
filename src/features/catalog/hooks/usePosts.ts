import { useState, useEffect } from "react";
import { API_Service } from "../../../lib/services/api";
import type { Post, UseAsyncResult } from "../../../types";

export function usePosts(): UseAsyncResult<Post[]> {
  const [data, setData] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    API_Service.getPosts()
      .then(setData)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
