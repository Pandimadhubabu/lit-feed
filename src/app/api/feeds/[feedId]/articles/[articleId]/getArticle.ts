import * as articlesModel from "@/models/articles";

export const getArticle = async ({
  params: { articleId },
}: {
  params: { articleId: string };
}) => {
  const data = await articlesModel.getArticle(articleId);

  return {
    status: 200,
    data,
    message: "Article retrieved",
  };
};
