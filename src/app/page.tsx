"use client";
import { Dialog, Transition } from "@headlessui/react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import {
  Cog6ToothIcon,
  Square3Stack3DIcon,
  StarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Fragment, useState } from "react";
import { Article } from "./components/Article";
import { Loading } from "./components/Loading";
import { Sidebar } from "./components/Sidebar";
import { useArticles } from "./hooks/useArticles";
import { useFeeds } from "./hooks/useFeeds";
import { useUser } from "./hooks/useUser";

const navigation = [
  { name: "Articles", href: "#", icon: Square3Stack3DIcon },
  { name: "Saved", href: "#", icon: StarIcon },
  { name: "Settings", href: "#", icon: Cog6ToothIcon },
];
export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [articleOpen, setArticleOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(0);
  const [selectedFeed, setSelectedFeed] = useState(0);
  const [selectedNavigation, setSelectedNavigation] = useState(0);

  const user = useUser();
  const feeds = useFeeds({ userId: user?.id });
  const articles = useArticles({
    feedId: feeds[selectedFeed]?.id,
    userId: user?.id,
  });

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 xl:hidden"
          onClose={setSidebarOpen}
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
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <Sidebar
                  navigation={navigation}
                  selectedNavigation={selectedNavigation}
                  onNavigationChange={setSelectedNavigation}
                  feeds={feeds}
                  selectedFeed={selectedFeed}
                  onFeedChange={setSelectedFeed}
                  user={user}
                />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {articles.length > 0 ? (
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
      ) : (
        <Loading />
      )}

      {/* Static sidebar for desktop */}
      <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <Sidebar
          navigation={navigation}
          selectedNavigation={selectedNavigation}
          onNavigationChange={setSelectedNavigation}
          feeds={feeds}
          selectedFeed={selectedFeed}
          onFeedChange={setSelectedFeed}
        />
      </div>

      <div className="xl:pl-72">
        {/* Sticky search header */}
        <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-white xl:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-5 w-5" aria-hidden="true" />
          </button>

          <header className="flex items-center justify-between border-b border-white/5 w-full px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
            <h2 className="text-base font-semibold leading-7 text-white">
              {feeds[selectedFeed]?.name}
            </h2>
          </header>
        </div>

        {/* Main content */}
        <aside className="dark:bg-gray-800 bg-gray-400 lg:fixed lg:bottom-0 lg:left-0 lg:top-16 lg:w-96 lg:overflow-y-auto lg:border-l lg:border-white/5 xl:left-auto">
          <ul role="list" className="divide-y divide-white/5">
            {articles.map((article, index) => (
              <li
                key={article.link}
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
                    {article.description}
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
                    {article.name}
                  </span>
                  <time
                    dateTime={article.dateTime}
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
          {articles.length > 0 ? (
            <Article article={articles[selectedArticle]} />
          ) : (
            <Loading />
          )}
        </main>
      </div>
    </div>
  );
}
