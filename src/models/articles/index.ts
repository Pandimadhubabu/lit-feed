import { debug } from "@/app/api/logger";
import { Article, Feed } from "@/types";
import { articles, mongoToObject, objectToMongo } from "../mongo";

export async function getAllArticles(feed: Feed): Promise<Article[]> {
  const articlesCollection = await articles();

  const mongoResult = await articlesCollection
    .find({
      feedId: feed.id,
    })
    .toArray();

  debug({ mongoResult }, "mongoResult");

  const articlesList = mongoResult.map(mongoToObject<Article>);

  debug({ articlesList }, "articlesList");

  return articlesList;
}

export async function getArticle(articleId: Article["id"]): Promise<Article> {
  const articlesCollection = await articles();

  const mongoResult = await articlesCollection.findOne(
    objectToMongo({
      id: articleId,
    }),
  );

  debug({ mongoResult }, "mongoResult");

  const article = mongoToObject<Article>(mongoResult);

  debug({ article }, "article");

  return article;
}

export async function updateArticle(originalArticle: Article) {
  const article = Object.assign({}, originalArticle);
  const articlesCollection = await articles();

  const mongoResult = await articlesCollection.updateOne(
    objectToMongo(article),
    {
      $set: article,
    },
  );

  debug({ mongoResult }, "mongoResult");

  const articleResult = mongoToObject<Article>(mongoResult);
  debug({ articleResult }, "updateArticle result");

  return articleResult;
}
