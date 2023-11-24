import * as articlesModel from "@/app/api/models/articles";
import { Article } from "@/types";

export async function updateArticle({
  body,
  params: { articleId },
}: {
  body: Article;
  params: { articleId: Article["id"] };
}) {
  const data = await articlesModel.updateArticle(body, articleId);

  return {
    status: 200,
    data,
    message: "Article updated",
  };
}
