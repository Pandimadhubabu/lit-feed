import { Bars3Icon } from "@heroicons/react/24/outline";
import { useFeeds } from "../hooks/useFeeds";
import { useUser } from "../hooks/useUser";

export function Header({
  setSidebarOpen,
  selectedFeed,
}: {
  setSidebarOpen: (value: boolean) => void;
  selectedFeed: number;
}) {
  const user = useUser();
  const feeds = useFeeds({ userId: user?.id });
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
        <h2 className="text-base font-semibold leading-7 text-white">
          {feeds[selectedFeed]?.name}
        </h2>
      </header>
    </div>
  );
}
