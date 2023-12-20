import { useEffect, useState } from "react";
import { Feed } from "@/types";
import { useApi } from "./useApi";

export function useFeeds(
  { refreshCounter }: { refreshCounter: number } = { refreshCounter: 0 },
) {
  const {
    setData: setFeeds,
    data: feeds,
    isLoading,
    error,
  } = useApi<Feed[]>(
    {
      path: "/api/feeds",
    },
    [refreshCounter],
  );
  return {
    feeds,
    setFeeds,
    isLoading,
    error,
  };
}
