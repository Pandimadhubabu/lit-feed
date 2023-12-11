import { createRepository } from "@/app/api/models/articles";
import { Article, User } from "@/types";

export async function updateArticle({
  body,
  params: { articleId },
  user,
}: {
  body: Article;
  params: { articleId: Article["id"] };
  user: User;
}) {
  const articles = createRepository(user);
  const data = await articles.updateArticle(body, articleId);

  return {
    status: 200,
    data,
    message: "Article updated",
  };
}
