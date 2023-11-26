import { useEffect, useMemo } from "react";

export function useApi(
  arg: {
    path: string;
    options?: RequestInit;
    setData: (data: any) => void;
    setIsLoading: (isLoading: boolean) => void;
    setError: (error: Error | null) => void;
  },
  required: any[],
) {
  const { path, options, setData, setIsLoading, setError } = arg;
  useMemo(() => {
    if (required.length !== 0 && !required.every((r) => r)) {
      return;
    }
    fetch(path, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error! code: ${response.status}, message: ${response.statusText}`,
          );
        }
        return response;
      })
      .then((response) => response.json())
      .then((result) => {
        const { data, message } = result;
        console.log(message);
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, [path, ...required]);
}
