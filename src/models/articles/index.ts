import { logger } from "@/utils";
import { articles, mongoToObject, objectToMongo } from "../mongo";
import { Article, Feed } from "@/types";

export async function getAllArticles(feed: Feed): Promise<Article[]> {
  const articlesCollection = await articles();

  const mongoResult = await articlesCollection
    .find({
      feedId: feed.id,
    })
    .toArray();

  logger.debug("mongoResult", mongoResult);

  const articlesList = mongoResult.map(mongoToObject<Article>);

  logger.debug("articlesList", articlesList);

  return articlesList;
}

export async function getArticle(articleId: Article["id"]): Promise<Article> {
  const articlesCollection = await articles();

  const mongoResult = await articlesCollection.findOne(
    objectToMongo({
      id: articleId,
    }),
  );

  logger.debug("mongoResult", mongoResult);

  const article = mongoToObject<Article>(mongoResult);

  logger.debug("article", article);

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

  logger.debug("mongoResult", mongoResult);

  const articleResult = mongoToObject<Article>(mongoResult);
  logger.debug("updateArticle result", articleResult);

  return articleResult;
}
