import { createRepository } from "@/app/api/models/articles";
import { Article, User } from "@/types";
export async function addArticle({
  body,
  params: { feedId },
  user,
}: {
  body: Article;
  params: { feedId: string };
  user: User;
}) {
  const articles = createRepository(user);
  const data = await articles.addArticle(body, feedId);
  return {
    status: 200,
    data,
    message: "Article added",
  };
}
