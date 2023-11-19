import { useEffect, useState } from "react";
import { Feed } from "@/types";

export function useFeeds() {
  const [feeds, setfeeds] = useState<Feed[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Replace this with a call to /api/feed
    const feeds = [
      {
        id: "1",
        name: "Stackoverflow Blog",
        href: "stackoverflow.com",
        link: "/feeds/1",
        unread: 1,
      },
      {
        id: "2",
        name: "Hacker News",
        href: "hackernews.com",
        link: "/feeds/2",
        unread: 0,
      },
      {
        id: "3",
        name: "Martin Fowler",
        href: "martinfowler.com",
        link: "/feeds/3",
        unread: 0,
      },
    ];
    setfeeds([
      { id: "0", name: "All Feeds", href: "#", link: "/", unread: 1 },
      ...feeds,
    ]);
    setIsLoading(false);
  }, []);

  return {
    feeds,
    isLoading,
    error,
  };
}
