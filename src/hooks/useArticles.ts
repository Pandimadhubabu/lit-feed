import { Article } from "@/types";
import { useState } from "react";
import { useApi } from "./useApi";

export function useArticles({ feedId }: { feedId?: string }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useApi(
    {
      path: `/api/feeds/${feedId}/articles`,
      setData: setArticles,
      setIsLoading,
      setError,
    },
    [feedId],
  );

  return {
    articles,
    setArticles,
    isLoading,
    error,
  };
}
