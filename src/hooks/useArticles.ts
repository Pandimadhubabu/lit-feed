import { useEffect, useState } from "react";
import { Article } from "@/types";

export function useArticles({ feedId }: { feedId?: string }) {
  const [articles, setArticles] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Replace this with a call to /api/feed/:sourceId
    setArticles([
      {
        title: "Can LLMs learn from a single example?",
        summary: `I've been working on a new approach to few-shot learning, and I'm excited to share some results.`,
        href: "https://www.fast.ai/posts/2023-09-04-learning-jumps/",
        feedName: "Hacker News",
        duration: "1h",
        date: "Wed, 6 Sep 2023 00:40:05 +0000",
        id: "1",
        feedId: "1",
        isRead: false,
        isSaved: false,
      },
      {
        title: "Fine-grained caching strategies of dynamic queries",
        summary: `Today I would like to talk about caching strategies for aggregate queries over time-based data which is updated often`,
        href: "https://jensrantil.github.io/posts/fast-aggregate-queries-on-dynamic-data",
        feedName: "Hacker News",
        duration: "1h",
        date: "Wed, 20 Sep 2023 17:42:24 +0000",
        id: "2",
        feedId: "1",
        isRead: true,
        isSaved: false,
      },
    ]);
    setIsLoading(false);
  }, [feedId]);

  return {
    articles,
    isLoading,
    error,
  };
}
