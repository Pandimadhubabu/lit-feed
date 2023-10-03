import { useEffect, useState } from "react";
import { Feed } from "@/types";

export function useFeeds() {
  const [feeds, setfeeds] = useState<Feed[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Replace this with a call to /api/feed
    const feeds = [
      { id: "1", name: "Stackoverflow Blog", link: "/feeds/1" },
      { id: "2", name: "Hacker News", link: "/feeds/2" },
      { id: "3", name: "Martin Fowler", link: "/feeds/3" },
    ];
    setfeeds([{ id: "0", name: "All Feeds", link: "/" }, ...feeds]);
    setIsLoading(false);
  }, []);

  return {
    feeds,
    isLoading,
    error,
  };
}
