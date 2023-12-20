"use client";
import { Loading } from "@/components/Loading";
import Shell from "@/components/Shell";
import { useArticles } from "@/hooks/useArticles";
import { useFeeds } from "@/hooks/useFeeds";
import type { Article as ArticleType } from "@/types";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

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

  if (isLoadingArticles) return <Loading />;

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
      <aside className="dark:bg-gray-800 bg-gray-400 lg:fixed lg:bottom-0 lg:left-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5 xl:left-auto">
        <ul role="list" className="divide-y divide-white/5">
          {articles.map((article, index) => (
            <Link href={`/articles/${article.id}`} key={article.href}>
              <li
                key={article.href}
                className={`${
                  index % 2 === 0
                    ? "dark:bg-gray-800 bg-gray-100"
                    : "dark:bg-gray-700 bg-gray-300"
                } px-4 py-4 sm:px-6 lg:px-8 cursor-pointer`}
              >
                <div className="flex items-center flex-col gap-x-3">
                  <h3 className="dark:text-white text-black flex-auto w-full truncate text-sm font-semibold leading-6">
                    {article.title}
                  </h3>
                  {!!article.summary && (
                    <p
                      id="summary"
                      className="dark:text-gray-400 text-gray-800 flex-auto w-full truncate text-xs"
                    >
                      {article.summary}
                    </p>
                  )}
                </div>
                <p className="dark:text-gray-500 text-gray-800 mt-3 truncate text-sm">
                  Published on{" "}
                  <span className="dark:text-gray-400 text-gray-800">
                    {article.feedName}
                  </span>
                  <time
                    dateTime={article.date}
                    className="dark:text-gray-600 text-gray-900 flex-none text-xs m-2"
                  >
                    {article.date}
                  </time>
                </p>
              </li>
            </Link>
          ))}
        </ul>
      </aside>
    </Shell>
  );
}
