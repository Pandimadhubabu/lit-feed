import { createRepository } from "@/app/api/models/articles";
import { User } from "@/types";

export async function getArticle({
  params: { articleId },
  user,
}: {
  params: { articleId: string };
  user: User;
}) {
  const articles = createRepository(user);
  const data = await articles.getArticle(articleId);

  return {
    status: 200,
    data,
    message: "Article retrieved",
  };
}
