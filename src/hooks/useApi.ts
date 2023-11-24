import { useEffect } from "react";

export function useApi({
  path,
  options,
  setData,
  setIsLoading,
  setError,
}: {
  path: string;
  options?: RequestInit;
  setData: (data: any) => void;
  setIsLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
}) {
  useEffect(() => {
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
  }, [options, path]);
}
