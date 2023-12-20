"use client";
import type { Article as ArticleType } from "@/types";

export function ArticleListItem({
  article,
  isSelected,
}: {
  article: ArticleType;
  isSelected: boolean;
}) {
  return (
    <li
      className={`${
        isSelected
          ? "dark:bg-gray-700 bg-gray-300"
          : "dark:bg-gray-800 bg-gray-100 hover:bg-gray-700"
      } px-4 py-4 sm:px-6 lg:px-8 cursor-pointer`}
    >
      <div className="flex flex-col gap-x-3">
        <h3 className="dark:text-white text-black flex-auto text-sm font-semibold leading-6">
          {article.title}
        </h3>
        {!!article.summary && (
          <p
            id="summary"
            className="dark:text-gray-400 text-gray-800 flex-auto text-xs h-12 overflow-hidden pointer-events-none"
            dangerouslySetInnerHTML={{ __html: article.summary }}
          ></p>
        )}
      </div>
      <p className="dark:text-gray-500 text-gray-800 mt-3 text-sm">
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
  );
}
