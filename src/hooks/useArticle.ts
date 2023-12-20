import { useState } from "react";
import { Article } from "@/types";
import { useApi } from "./useApi";

export function useArticle({ articleId }: { articleId: string }) {
  const { data, setData, isLoading, error } = useApi(
    {
      path: `/api/articles/${articleId}`,
    },
    [articleId],
  );

  return {
    article: data as Article,
    setArticle: setData as (article: Article) => void,
    isLoading,
    error,
  };
}
