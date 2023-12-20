import { useEffect, useState } from "react";
import { Feed } from "@/types";
import { useApi } from "./useApi";

export function useFeeds(
  { refreshCounter }: { refreshCounter: number } = { refreshCounter: 0 },
) {
  const [feeds, setFeeds] = useState<Feed[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useApi(
    {
      path: "/api/feeds",
      setData: setFeeds,
      setIsLoading,
      setError,
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
