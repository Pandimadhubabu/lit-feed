import * as articlesModel from "@/app/api/models/articles";

export async function deleteArticle({
  params: { articleId },
}: {
  params: { articleId: string };
}) {
  const data = await articlesModel.deleteArticle(articleId);

  return {
    status: 200,
    data,
    message: "Article deleted",
  };
}
