import { logDebug } from "@/app/api/logger";
import { Article, Feed } from "@/types";
import { articles, mongoToObject, objectToMongo } from "../mongo";

export async function getAllArticles(feed: Feed): Promise<Article[]> {
  const articlesCollection = await articles();

  const mongoResult = await articlesCollection
    .find({
      feedId: feed.id,
    })
    .toArray();

  logDebug({ mongoResult }, "mongoResult");

  const articlesList = mongoResult.map(mongoToObject<Article>);

  logDebug({ articlesList }, "articlesList");

  return articlesList;
}

export async function getArticle(articleId: Article["id"]): Promise<Article> {
  const articlesCollection = await articles();

  const mongoResult = await articlesCollection.findOne(
    objectToMongo({
      id: articleId,
    }),
  );

  logDebug({ mongoResult }, "mongoResult");

  const article = mongoToObject<Article>(mongoResult);

  logDebug({ article }, "article");

  return article;
}

export async function updateArticle(article: Article) {
  const articlesCollection = await articles();

  const mongoResult = await articlesCollection.updateOne(
    objectToMongo(article),
    {
      $set: article,
    },
  );

  logDebug({ mongoResult }, "mongoResult");

  const articleResult = mongoToObject<Article>(mongoResult);
  logDebug({ articleResult }, "updateArticle result");

  return articleResult;
}
