import { ChevronRightIcon } from "@heroicons/react/24/outline"
import { Article } from "../types"

export function Article({ article }: { article: Article }) {

  return (
    <div className="bg-gray-200 dark:bg-black w-full h-full">
      <header className="flex items-center justify-between border-b border-white/5 px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
        <h1 className="text-base font-semibold leading-7 dark:text-white text-black">{article.title.name}</h1>
      </header>

      {/* Deployment list */}
      <div className="relative flex items-center space-x-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="min-w-0 flex-auto">
          <div className="mt-3 flex items-center gap-x-2.5 text-xs leading-5 dark:text-gray-400 text-gray-800">
            <p className="truncate">description</p>
            <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 flex-none fill-gray-300">
              <circle cx={1} cy={1} r={1} />
            </svg>
            <p className="whitespace-nowrap">status</p>
          </div>
        </div>
        <ChevronRightIcon className="h-5 w-5 flex-none dark:text-gray-400 text-gray-800" aria-hidden="true" />
      </div>
    </div>
  )
}