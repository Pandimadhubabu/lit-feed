"use client";
import Confirm from "@/components/Confirm";
import { FeedEditor } from "@/components/FeedEditor";
import { Loading } from "@/components/Loading";
import Shell from "@/components/Shell";
import { useFeeds } from "@/hooks/useFeeds";
import { Feed } from "@/types";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

export default function Edit() {
  const [feed, setFeed] = useState<Feed | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const [shouldReload, setShouldReload] = useState(false);
  const [isFeedEditorOpen, setIsFeedEditorOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [refreshCounter, setRefreshCounter] = useState(0);
  const { feeds, isLoading, error } = useFeeds({ refreshCounter });
  const refresh = () => setRefreshCounter((counter) => counter + 1);

  useEffect(() => {
    if (shouldReload) {
      refresh();
    }
  }, [shouldReload]);

  useEffect(() => {
    const handleUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [isDirty]);

  function deleteFeed(feedId: string) {
    fetch(`/api/feeds/${feedId}`, {
      method: "DELETE",
    }).then(() => {
      refresh();
    });
  }

  if (isLoading) {
    return (
      <Shell headerTitle="Edit Feeds">
        <Loading />
      </Shell>
    );
  }

  if (error) {
    return (
      <Shell headerTitle="Edit Feeds">
        <p>Error: {error.message}</p>
      </Shell>
    );
  }

  return (
    <Shell headerTitle="Edit Feeds">
      <div className="flex flex-col h-full">
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <div className="flex justify-between">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                  Feeds
                </h2>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white dark:bg-gray-800 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                  onClick={() => {
                    setIsDirty(false);
                    setFeed(null);
                    setIsFeedEditorOpen(true);
                  }}
                >
                  Add Feed
                </button>
              </div>
              <div className="mt-4">
                <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {feeds.map((feed) => (
                    <li
                      key={feed.id}
                      className="col-span-1 flex shadow-sm rounded-md"
                    >
                      <div className="flex-shrink-0 flex items-center justify-center w-16 bg-gray-800 text-white text">
                        {feed.name[0]}
                      </div>
                      <div className="flex-1 flex items-center justify-between border-t border-r border-b border-white/5 bg-white dark:bg-black dark:border-gray-800 dark:hover:bg-gray-800 dark:hover:text-white hover:bg-gray-50 hover:text-gray-900 truncate">
                        <div className="flex-1 px-4 py-2 text-sm truncate">
                          <p className="text-gray-900 dark:text-white font-medium hover:text-gray-600">
                            {feed.name}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400">
                            {feed.href}
                          </p>
                        </div>
                        <div className="flex-shrink-0 pr-2">
                          <button
                            type="button"
                            className="font-medium text-gray-500 dark:text-gray-400 hover:text-gray-600"
                            onClick={() => {
                              setIsDirty(false);
                              setFeed(feed);
                              setIsFeedEditorOpen(true);
                            }}
                          >
                            Edit
                          </button>
                        </div>
                        <div className="flex-shrink-0 pr-2">
                          <button
                            type="button"
                            className="font-medium text-gray-500 dark:text-gray-400 hover:text-gray-600"
                            onClick={() => {
                              setIsDirty(false);
                              setFeed(feed);
                              setIsConfirmOpen(true);
                            }}
                          >
                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
        {isFeedEditorOpen && (
          <FeedEditor
            feedArg={feed}
            isDirty={isDirty}
            onClose={() => setIsFeedEditorOpen(false)}
            onDirty={() => {
              setIsDirty(true);
            }}
            onSaved={() => {
              setIsDirty(false);
              setShouldReload(true);
              setIsFeedEditorOpen(false);
              refresh();
            }}
          />
        )}
        {isConfirmOpen && (
          <Confirm
            title="Delete Feed"
            message={`Are you sure you want to delete ${feed?.name}?`}
            onConfirm={() => {
              setIsDirty(false);
              if (feed) {
                deleteFeed(feed.id);
              }
              setIsConfirmOpen(false);
            }}
            onCancel={() => {
              setIsConfirmOpen(false);
              setIsDirty(false);
            }}
          />
        )}
      </div>
    </Shell>
  );
}
