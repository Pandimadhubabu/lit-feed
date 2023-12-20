"use client";
import { Article } from "@/components/Article";
import { Loading } from "@/components/Loading";
import Shell from "@/components/Shell";
import { useArticles } from "@/hooks/useArticles";
import { useFeeds } from "@/hooks/useFeeds";
import type { Article as ArticleType } from "@/types";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

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
  const [articleOpen, setArticleOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(0);
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
      <Transition.Root show={articleOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setArticleOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-full flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setArticleOpen(false)}
                    >
                      <span className="sr-only">Close article</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <Article article={articles[selectedArticle]} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Main content */}
      <aside className="dark:bg-gray-800 bg-gray-400 lg:fixed lg:bottom-0 lg:left-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5 xl:left-auto">
        <ul role="list" className="divide-y divide-white/5">
          {articles.map((article, index) => (
            <li
              key={article.href}
              className={
                (selectedArticle === index
                  ? "dark:bg-gray-600 bg-gray-700"
                  : `${
                      index % 2 === 0
                        ? "dark:bg-gray-800 bg-gray-100"
                        : "dark:bg-gray-700 bg-gray-300"
                    }`) + " px-4 py-4 sm:px-6 lg:px-8 cursor-pointer"
              }
              onClick={() => {
                setArticleOpen(true);
                setSelectedArticle(index);
              }}
            >
              <div className="flex items-center flex-col gap-x-3">
                <h3
                  className={
                    (selectedArticle === index
                      ? "text-white"
                      : "dark:text-white text-black") +
                    " flex-auto w-full truncate text-sm font-semibold leading-6"
                  }
                >
                  {article.title}
                </h3>
                <p
                  id="description"
                  className={
                    (selectedArticle === index
                      ? "text-gray-400"
                      : "dark:text-gray-400 text-gray-800") +
                    " flex-auto w-full truncate text-xs"
                  }
                >
                  {article.summary}
                </p>
              </div>
              <p
                className={
                  (selectedArticle === index
                    ? "text-gray-500"
                    : "dark:text-gray-500 text-gray-800") +
                  " mt-3 truncate text-sm"
                }
              >
                Published on{" "}
                <span
                  className={
                    selectedArticle === index
                      ? "text-gray-400"
                      : "dark:text-gray-400 text-gray-800"
                  }
                >
                  {article.feedName}
                </span>
                <time
                  dateTime={article.date}
                  className={
                    (selectedArticle === index
                      ? "text-gray-600"
                      : "dark:text-gray-600 text-gray-900") +
                    " flex-none text-xs m-2"
                  }
                >
                  {article.date}
                </time>
              </p>
            </li>
          ))}
        </ul>
      </aside>
      <main className="hidden w-full h-full lg:block lg:fixed lg:left-96 xl:left-[42rem]">
        <Article article={articles[selectedArticle]} />
      </main>
    </Shell>
  );
}
