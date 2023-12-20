import { Feed } from "@/types";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect, useMemo } from "react";

export function FeedEditor({
  feedArg,
  isDirty,
  onClose,
  onDirty,
  onSaved,
}: {
  feedArg: Feed | null;
  isDirty: boolean;
  onClose: () => void;
  onDirty: () => void;
  onSaved: () => void;
}) {
  const [name, setName] = useState("");
  const [href, setHref] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const feed = useMemo(
    () =>
      feedArg || {
        id: "",
        name: "",
        href: "",
        userId: "",
        updatedAt: "",
        unread: 0,
      },
    [feedArg]
  );

  // Cancel if escape key is pressed
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const saveFeed = useMemo(
    () => async () => {
      setIsSaving(true);
      const response = await fetch(`/api/feeds/${feedArg ? feedArg.id : ""}`, {
        method: feedArg ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          href,
        }),
      });
      setIsSaving(false);
      setIsSaved(true);
      onSaved();
    },
    [feedArg, name, href, onSaved]
  );

  // Save if enter key is pressed
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Enter") {
        saveFeed();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [saveFeed]);

  useEffect(() => {
    setName(feed.name);
    setHref(feed.href);
  }, [feed]);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <section
          className="absolute inset-y-0 pl-16 max-w-full right-0 flex"
          aria-labelledby="slide-over-heading"
        >
          <div className="relative w-screen max-w-md">
            <div className="h-full flex flex-col py-6 bg-white dark:bg-black shadow-xl overflow-y-scroll">
              <div className="px-4 sm:px-6">
                <div className="flex items-start justify-between">
                  <h2
                    id="slide-over-heading"
                    className="text-lg font-medium text-gray-900 dark:text-white"
                  >
                    {feed ? "Edit Feed" : "Add Feed"}
                  </h2>
                  <div className="ml-3 h-7 flex items-center">
                    <button
                      onClick={onClose}
                      className="bg-white dark:bg-black rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-white/50"
                    >
                      <span className="sr-only">Close panel</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-6 relative flex-1 px-4 sm:px-6">
                <div className="absolute inset-0 px-4 sm:px-6">
                  <div
                    className="h-full border-2 border-dashed border-gray-200 dark:border-gray-800"
                    aria-hidden="true"
                  />
                </div>
                <div className="relative h-full flex flex-col justify-between">
                  <div className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block p-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          className="block p-2 w-full shadow-sm text-black dark:text-white dark:bg-gray-900 sm:text-sm focus:ring-white/50 focus:border-white/50 border-gray-300 dark:border-gray-800 rounded-md"
                          placeholder="Name"
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            onDirty();
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="href"
                        className="block p-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        URL
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          name="href"
                          id="href"
                          className="block p-2 w-full text-black dark:text-white dark:bg-gray-900 shadow-sm sm:text-sm focus:ring-white/50 focus:border-white/50 border-gray-300 dark:border-gray-800 rounded-md"
                          placeholder="URL"
                          value={href}
                          onChange={(e) => {
                            setHref(e.target.value);
                            onDirty();
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-none">
                    <button
                      type="button"
                      className={`w-full flex items-center justify-center px-4 py-4 sm:px-6 sm:py-6 lg:px-8 ${
                        isSaved
                          ? "bg-green-500 hover:bg-green-600"
                          : isDirty
                          ? "bg-gray-800 hover:bg-gray-900 dark:bg-gray-900 dark:hover:bg-gray-800 dark:hover:text-white hover:text-white"
                          : "bg-gray-200 dark:bg-black dark:hover:bg-gray-800 dark:hover:text-white hover:bg-gray-50 hover:text-gray-900"
                      }`}
                      onClick={saveFeed}
                      disabled={isSaving}
                    >
                      <span className="text-base font-semibold leading-7 dark:text-white text-black">
                        {isSaved ? "Saved" : "Save"}
                      </span>
                      {isSaved ? (
                        <CheckIcon
                          className="h-5 w-5 ml-2 flex-none"
                          aria-hidden="true"
                        />
                      ) : null}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
