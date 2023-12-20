"use client";
import { Loading } from "@/components/Loading";
import Shell from "@/components/Shell";
import { useArticles } from "@/hooks/useArticles";
import { useFeeds } from "@/hooks/useFeeds";
import type { Article as ArticleType } from "@/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArticleListItem } from "../../../components/ArticleListItem";

async function refreshFeed(feedId: string) {
  const response = await fetch(`/api/feeds/${feedId}/refresh`, {
    method: "POST",
  });
  const { message } = await response.json();

  return message;
}

async function refreshArticles(feedId: string) {
  const response = await fetch(`/api/feeds/${feedId}/articles`);
  const { data } = await response.json();

  return data;
}

export default function Feed() {
  const [headerTitle, setHeaderTitle] = useState("");
  const [isArticlesRefreshed, setIsArticlesRefreshed] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<undefined | number>();
  const [isLargeScreen, setIsLargeScreen] = useState(
    typeof window === "undefined"
      ? false
      : window.matchMedia("(min-width: 1024px)").matches
  );

  // Set isLargeScreen on resize
  useEffect(() => {
    const handler = () =>
      setIsLargeScreen(window.matchMedia("(min-width: 1024px)").matches);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const { feedId } = useParams() as { feedId: string };

  const { feeds, isLoading: isLoadingFeeds, error: feedsError } = useFeeds();

  const {
    articles,
    setArticles,
    isLoading: isLoadingArticles,
    error: articlesError,
  } = useArticles({
    feedId,
  });

  useEffect(() => {
    if (isLoadingArticles || !articles || isLoadingFeeds || !feeds) return;
    const currentFeed = feeds.find((feed) => feed.id === feedId);
    if (!currentFeed) return;
    const { name, updatedAt } = currentFeed;
    setHeaderTitle(name);
    if (
      !isArticlesRefreshed &&
      (!articles.length ||
        !updatedAt ||
        // Refresh if feed was updated more than 30 minutes ago
        Date.now() - new Date(updatedAt).getTime() > 1000 * 60 * 30)
    ) {
      setIsArticlesRefreshed(true);
      refreshFeed(feedId)
        .then(() => refreshArticles(feedId))
        .then((articles: ArticleType[]) => {
          setArticles(articles);
        });
    }
    setHeaderTitle(name);
  }, [
    isLoadingArticles,
    articles,
    isLoadingFeeds,
    feeds,
    feedId,
    isArticlesRefreshed,
    setArticles,
  ]);

  if (isLoadingArticles || !articles)
    return (
      <Shell headerTitle={headerTitle}>
        <Loading />
      </Shell>
    );

  if (articlesError)
    return (
      <Shell headerTitle={headerTitle}>
        <div className="flex-grow flex items-center justify-center">
          <p className="text-white text-2xl">
            Error loading articles {articlesError.message}
          </p>
        </div>
      </Shell>
    );
  if (!articles.length) {
    return (
      <Shell headerTitle={headerTitle}>
        <div className="flex-grow flex items-center justify-center">
          <p className="text-white text-2xl">No articles found</p>
        </div>
      </Shell>
    );
  }

  return (
    <Shell headerTitle={headerTitle}>
      {/* Main content */}
      <div className="grid lg:grid-cols-3 lg:grid-rows-1 lg:gap-4">
        <aside className="dark:bg-gray-800 w-full bg-gray-400 lg:bottom-0 lg:left-0 lg:top-16 lg:overflow-y-auto lg:border-l lg:border-white/5 xl:left-auto">
          <ul role="list" className="divide-y divide-white/5">
            {articles.map((article, index) =>
              isLargeScreen ? (
                <div onClick={() => setSelectedArticle(index)} key={article.id}>
                  <ArticleListItem
                    article={article}
                    isSelected={selectedArticle === index}
                  />
                </div>
              ) : (
                <Link href={`/articles/${article.id}`} key={article.id}>
                  <ArticleListItem
                    article={article}
                    isSelected={selectedArticle === index}
                  />
                </Link>
              )
            )}
          </ul>
        </aside>
        {isLargeScreen && (
          // Show article on large screens on the right
          <div
            className={`mt-2 mr-3 col-span-2 ${
              selectedArticle !== undefined ? "flex" : "hidden"
            }`}
          >
            <p
              className="text-white dark:text-gray-300 text-justify"
              dangerouslySetInnerHTML={{
                __html:
                  articles[selectedArticle ?? 0].content ??
                  articles[selectedArticle ?? 0].summary ??
                  "",
              }}
            ></p>
          </div>
        )}
      </div>
    </Shell>
  );
}
