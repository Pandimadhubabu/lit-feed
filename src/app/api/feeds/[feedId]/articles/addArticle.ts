import * as articlesModel from "@/app/api/models/articles";
import { Article } from "@/types";
export async function addArticle({
  body,
  params: { feedId },
}: {
  body: Article;
  params: { feedId: string };
}) {
  const data = await articlesModel.addArticle(body, feedId);
  return {
    status: 200,
    data,
    message: "Article added",
  };
}
