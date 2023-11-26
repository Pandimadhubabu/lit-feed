import { useEffect, useState } from "react";
import { Article } from "@/types";
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
    isLoading,
    error,
  };
}
