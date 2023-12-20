import { Article } from "@/types";
import Link from "next/link";

export default function ArticleContent(selectedArticle: Article) {
  return (
    <div className="flex flex-col gap-y-5 p-4">
      <a href={selectedArticle.href} target="_blank" rel="noopener noreferrer">
        <h1 className="text-3xl font-bold">{selectedArticle.title}</h1>
      </a>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Published on{" "}
        <span className="text-gray-900 dark:text-white">
          <Link href={`/feeds/${selectedArticle.feedId}`}>
            {selectedArticle.feedName}
          </Link>
        </span>
        {!!selectedArticle.date && (
          <time dateTime={selectedArticle.date} className="ml-2">
            {new Date(selectedArticle.date).toLocaleDateString()}
          </time>
        )}
      </p>
      <img src={selectedArticle.image} alt="" className="w-full" />
      <p
        className="text-white dark:text-gray-300 text-justify"
        dangerouslySetInnerHTML={{
          __html: selectedArticle.content ?? selectedArticle.summary ?? "",
        }}
      ></p>
    </div>
  );
}
