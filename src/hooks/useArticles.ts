import { Article } from "@/types";
import { useState } from "react";
import { useApi } from "./useApi";

export function useArticles({ feedId }: { feedId?: string }) {
  const { data, setData, isLoading, error } = useApi(
    {
      path: `/api/feeds/${feedId}/articles`,
    },
    [feedId],
  );

  return {
    articles: data as Article[],
    setArticles: setData as (articles: Article[]) => void,
    isLoading,
    error,
  };
}
