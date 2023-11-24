import * as articlesModel from "@/models/articles";
import { Article } from "@/types";

export const updateArticle = async ({
  body,
  params: { articleId },
}: {
  body: Article;
  params: { articleId: Article["id"] };
}) => {
  const data = await articlesModel.updateArticle(body, articleId);

  return {
    status: 200,
    data,
    message: "Article updated",
  };
};