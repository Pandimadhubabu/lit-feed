import { createRepository } from "@/app/api/models/articles";
import { User } from "@/types";

export async function getArticles({
  params: { feedId },
  user,
}: {
  params: { feedId: string };
  user: User;
}) {
  const articles = createRepository(user);
  const data = await articles.getArticles(feedId);

  return {
    status: 200,
    data,
    message: "Articles retrieved",
  };
}
