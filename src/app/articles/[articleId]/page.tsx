"use client";
import { Loading } from "@/components/Loading";
import Shell from "@/components/Shell";
import { useArticle } from "@/hooks/useArticle";
import { useParams } from "next/navigation";

export default function Article() {
  const { articleId } = useParams() as { articleId: string };

  const {
    article,
    isLoading: isLoadingArticle,
    error: articlesError,
  } = useArticle({
    articleId,
  });

  if (isLoadingArticle) {
    return <Loading />;
  }

  if (articlesError) {
    return <p>Error: {articlesError.message}</p>;
  }

  if (!article) {
    return <p>Article not found</p>;
  }

  const {
    title,
    content,
    summary,
    feedName,
    href,
    isRead,
    isSaved,
    date,
    image,
  } = article;
  const description = content || summary || "";

  return (
    <Shell headerTitle={feedName}>
      <div className="flex flex-col gap-y-5">
        <a href={href} target="_blank" rel="noopener noreferrer">
          <h1 className="text-3xl font-bold">{title}</h1>
        </a>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Published on{" "}
          <span className="text-gray-900 dark:text-white">{feedName}</span>
          {!!date && (
            <time dateTime={date} className="ml-2">
              {new Date(date).toLocaleDateString()}
            </time>
          )}
        </p>
        <img src={image} alt="" className="w-full" />
        <div
          className="prose dark:prose-dark max-w-none"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>

      <div className="flex justify-between mt-5">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white dark:bg-gray-800 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          Mark as {isRead ? "unread" : "read"}
        </button>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white dark:bg-gray-800 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
        >
          {isSaved ? "Unsave" : "Save"}
        </button>
      </div>
    </Shell>
  );
}
