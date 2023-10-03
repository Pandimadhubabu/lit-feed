import { useFeeds } from "@/hooks/useFeeds";
import { useSegments } from "@/hooks/useSegments";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { use, useEffect, useState } from "react";

export function Header({
  setSidebarOpen,
}: {
  setSidebarOpen: (value: boolean) => void;
}) {
  const [name, setName] = useState("");
  const segments = useSegments();
  const { feeds } = useFeeds();
  useEffect(() => {
    const [segmentName, feedId] = segments;
    const selectedFeedIndex =
      segmentName === "feed"
        ? feeds.findIndex((feed) => feed.id === feedId)
        : -1;

    let name;
    switch (segmentName) {
      case "feed":
        name = feeds[selectedFeedIndex]?.name;
        break;
      case "saved":
        name = "Saved";
        break;
      case "settings":
        name = "Settings";
        break;
      default:
        name = "All Articles";
    }
    setName(name);
  }, [segments, feeds]);
  return (
    /* Sticky search header */
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
        <h2 className="text-base font-semibold leading-7 text-white">{name}</h2>
      </header>
    </div>
  );
}
