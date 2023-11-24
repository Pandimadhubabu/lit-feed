import * as articlesModel from "@/models/articles";

export async function getArticles({
  params: { feedId },
}: {
  params: { feedId: string };
}) {
  const data = await articlesModel.getArticles(feedId);

  return {
    status: 200,
    data,
    message: "Articles retrieved",
  };
}
