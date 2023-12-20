import { useMemo, useState } from "react";

// In-memory cache
const cache: Record<string, { data: unknown; timestamp: number }> = {};

export function useApi(
  arg: {
    path: string;
    options?: RequestInit;
  },
  monitor: any[],
) {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [previousMonitoredValue, setPreviousMonitoredValue] = useState<
    any[] | undefined
  >(undefined);
  const { path, options } = arg;

  const setDataAndUpdateCache = (data: any) => {
    setData(data);
    cache[JSON.stringify({ path, options })] = { data, timestamp: Date.now() };
  };
  useMemo(() => {
    const cacheKey = JSON.stringify({ path, options });

    if (
      previousMonitoredValue &&
      areArraysExactlyTheSame(previousMonitoredValue, monitor)
    ) {
      console.log("skipping", monitor);
      return;
    }
    setPreviousMonitoredValue(monitor);
    // Check if the response is in the cache
    if (cache[cacheKey]) {
      const { data, timestamp } = cache[cacheKey];
      const isCacheValid = Date.now() - timestamp < 30 * 60 * 1000; // 30 minutes

      if (isCacheValid) {
        setData(data);
        setIsLoading(false);
        return;
      }
    }
    fetch(path, {
      ...options,
      headers: {
        Authorization: `Bearer `,
      },
    })
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            window.location.href = "/api/auth/login";
          }
          throw new Error(
            `Error! code: ${response.status}, message: ${response.statusText}`,
          );
        }
        return response;
      })
      .then((response) => response.json())
      .then((result) => {
        const { data, message } = result;
        setDataAndUpdateCache(data);
        setIsLoading(false);

        // Store the response in the cache
        cache[cacheKey] = { data, timestamp: Date.now() };
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [path, ...monitor]);

  return {
    data,
    setData: setDataAndUpdateCache,
    isLoading,
    setIsLoading,
    error,
    setError,
  };
}

function areArraysExactlyTheSame<T>(a: T[], b: T[]) {
  if (a.length !== b.length) {
    return false;
  }
  return a.every((item, index) => item === b[index]);
}
