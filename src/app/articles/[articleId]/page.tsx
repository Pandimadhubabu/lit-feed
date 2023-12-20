"use client";
import ArticleContent from "@/components/ArticleContent";
import { Loading } from "@/components/Loading";
import Shell from "@/components/Shell";
import { useArticle } from "@/hooks/useArticle";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export default function Article() {
  const { articleId } = useParams() as { articleId: string };
  const [sanitizedDescription, setSanitizedDescription] = useState("");
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);

  const {
    article,
    isLoading: isLoadingArticle,
    error: articlesError,
  } = useArticle({
    articleId,
  });

  useEffect(() => {
    const parser = new DOMParser();
    const description = article?.content ?? article?.summary ?? "";
    const doc = parser.parseFromString(description, "text/html");
    const iframes = doc.getElementsByTagName("iframe");

    while (iframes.length > 0) {
      iframes[0].parentNode?.removeChild(iframes[0]);
    }

    // Remove all script tags
    const scripts = doc.getElementsByTagName("script");

    while (scripts.length > 0) {
      scripts[0].parentNode?.removeChild(scripts[0]);
    }

    setSanitizedDescription(doc.body.innerHTML);
  }, [article]);

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

  return (
    <Shell headerTitle={feedName}>
      <ArticleContent {...article} />
    </Shell>
  );
}
