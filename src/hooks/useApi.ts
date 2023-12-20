import { useMemo, useState } from "react";

export function useApi(
  arg: {
    path: string;
    options?: RequestInit;
    setData: (data: any) => void;
    setIsLoading: (isLoading: boolean) => void;
    setError: (error: Error | null) => void;
  },
  monitor: any[],
) {
  const [previousMonitoredValue, setPreviousMonitoredValue] = useState<
    any[] | undefined
  >(undefined);
  const { path, options, setData, setIsLoading, setError } = arg;
  useMemo(() => {
    if (
      previousMonitoredValue &&
      areArraysExactlyTheSame(previousMonitoredValue, monitor)
    ) {
      console.log("skipping", monitor);
      return;
    }
    setPreviousMonitoredValue(monitor);
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
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [path, ...monitor]);
}

function areArraysExactlyTheSame<T>(a: T[], b: T[]) {
  if (a.length !== b.length) {
    return false;
  }
  return a.every((item, index) => item === b[index]);
}
