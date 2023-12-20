import { useState } from "react";
import { Article } from "@/types";
import { useApi } from "./useApi";

export function useArticle({ articleId }: { articleId: string }) {
  const {
    data: article,
    setData: setArticle,
    isLoading,
    error,
  } = useApi<Article>(
    {
      path: `/api/articles/${articleId}`,
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
