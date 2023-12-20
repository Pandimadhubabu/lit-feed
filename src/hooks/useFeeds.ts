import { useEffect, useState } from "react";
import { Feed } from "@/types";
import { useApi } from "./useApi";

export function useFeeds(
  { refreshCounter }: { refreshCounter: number } = { refreshCounter: 0 },
) {
  const { setData, data, isLoading, error } = useApi(
    {
      path: "/api/feeds",
    },
    [refreshCounter],
  );
  return {
    feeds: data as Feed[],
    setFeeds: setData as (feeds: Feed[]) => void,
    isLoading,
    error,
  };
}
