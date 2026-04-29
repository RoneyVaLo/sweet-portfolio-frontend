import { useState, useEffect } from "react";
import { API_Service } from "../../../lib/services/api";
import type { FaqItem, UseAsyncResult } from "../../../types";

export function useFaq(): UseAsyncResult<FaqItem[]> {
  const [data, setData] = useState<FaqItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    API_Service.getFaqs()
      .then(setData)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
