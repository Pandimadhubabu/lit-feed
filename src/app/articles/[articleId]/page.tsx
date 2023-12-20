"use client";
import { Loading } from "@/components/Loading";
import Shell from "@/components/Shell";
import { useArticle } from "@/hooks/useArticle";
import Link from "next/link";
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
    return (
      <Shell headerTitle="Article">
        <Loading />
      </Shell>
    );
  }

  if (articlesError) {
    return (
      <Shell headerTitle="Article failed to load">
        <p>Error: {articlesError.message}</p>
      </Shell>
    );
  }

  if (!article) {
    return (
      <Shell headerTitle="Article not found">
        <p>Article not found</p>
      </Shell>
    );
  }

  const { title, content, summary, feedName, href, feedId, date, image } =
    article;
  const description = content || summary || "";

  return (
    <Shell headerTitle={feedName}>
      <div className="flex flex-col gap-y-5 p-4">
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
        {/** Back button with an array pointing left, on the right bottom side of the screen */}
        <Link
          href={`/feeds/${feedId}`}
          className="fixed bottom-4 right-4 p-2 rounded-full text-sm"
        >
          &larr; Back to feed
        </Link>
      </div>
    </Shell>
  );
}
