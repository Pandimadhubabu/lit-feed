import { Article } from "@/types";
import { useState } from "react";
import { useApi } from "./useApi";

export function useArticles({ feedId }: { feedId: string }) {
  const {
    data: articles,
    setData: setArticles,
    isLoading,
    error,
  } = useApi<Article[]>(
    {
      path: `/api/feeds/${feedId}/articles`,
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
