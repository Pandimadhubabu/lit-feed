import { useEffect, useState } from "react";
import { Feed } from "../types";

export function useFeeds({ userId }: { userId?: string }) {
  const [sources, setSources] = useState<Feed[]>([]);

  useEffect(() => {
    // Replace this with a call to /api/feed
    setSources([
      { id: "0", name: "All Feeds", href: "#" },
      { id: "1", name: "Stackoverflow Blog", href: "#" },
      { id: "2", name: "Hacker News", href: "#" },
      { id: "3", name: "Martin Fowler", href: "#" },
    ]);
  }, []);

  return sources;
}
