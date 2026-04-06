import { useState, useEffect, useCallback } from "react";
import { logger } from "@/lib/logger";

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseFetchReturn<T> extends UseFetchState<T> {
  refetch: () => Promise<void>;
}

/**
 * Generic data fetching hook with loading, error, and refetch support.
 * Eliminates the repeated useState/useEffect/try-catch pattern
 * across faculty, gallery, and admin pages.
 *
 * @example
 * const { data, loading, error, refetch } = useFetch<FacultyListResponse>("/api/faculty");
 * const faculty = data?.faculty ?? [];
 */
export function useFetch<T>(url: string): UseFetchReturn<T> {
  const [state, setState] = useState<UseFetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const res = await fetch(url);

      if (!res.ok) {
        const errorBody = await res.json().catch(() => ({}));
        throw new Error(errorBody.error || `HTTP ${res.status}`);
      }

      const data: T = await res.json();
      setState({ data, loading: false, error: null });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      logger.error(`Fetch failed: ${url}`, err);
      setState({ data: null, loading: false, error: message });
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...state, refetch: fetchData };
}

/**
 * Hook for making API mutations (POST/PUT/DELETE) with loading state.
 *
 * @example
 * const { mutate, loading } = useMutation("/api/faculty");
 * await mutate({ name: "New Faculty" }, "POST");
 */
export function useMutation(baseUrl: string) {
  const [loading, setLoading] = useState(false);

  const mutate = useCallback(
    async <T = Record<string, unknown>>(
      body: Record<string, unknown> | null,
      method: "POST" | "PUT" | "DELETE" = "POST",
      queryParams?: string
    ): Promise<{ success: boolean; data?: T; error?: string }> => {
      setLoading(true);

      try {
        const url = queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
        const res = await fetch(url, {
          method,
          headers: body ? { "Content-Type": "application/json" } : undefined,
          body: body ? JSON.stringify(body) : undefined,
        });

        const data = await res.json();

        if (!res.ok) {
          return { success: false, error: data.error || `HTTP ${res.status}` };
        }

        return { success: true, data };
      } catch (err) {
        const message = err instanceof Error ? err.message : "Network error";
        logger.error(`Mutation failed: ${method} ${baseUrl}`, err);
        return { success: false, error: message };
      } finally {
        setLoading(false);
      }
    },
    [baseUrl]
  );

  return { mutate, loading };
}
