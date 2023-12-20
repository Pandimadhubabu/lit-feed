import { useState } from "react";
import { Article } from "@/types";
import { useApi } from "./useApi";

export function useArticle({ articleId }: { articleId: string }) {
  const [article, setArticle] = useState<Article | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useApi(
    {
      path: `/api/articles/${articleId}`,
      setData: setArticle,
      setIsLoading,
      setError,
    },
    [articleId],
  );

  return {
    article,
    setArticle,
    isLoading,
    error,
  };
}
