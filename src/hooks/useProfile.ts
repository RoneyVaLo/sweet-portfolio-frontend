import { useState, useEffect } from 'react';
import { API_Service } from '../services/api';
import type { Profile, UseAsyncResult } from '../types';

export function useProfile(): UseAsyncResult<Profile> {
  const [data, setData] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    API_Service.getProfile()
      .then(setData)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
