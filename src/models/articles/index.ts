import { debug } from "@/app/api/logger";
import { Article, Feed } from "@/types";
import { articles, feeds, mongoToObject, objectToMongo } from "../mongo";
import { ObjectId } from "mongodb";
import { NotFoundError } from "@/app/api/errors";

export async function getArticles(feedId: Feed["id"]): Promise<Article[]> {
  const articlesCollection = await articles();

  const mongoResult = await articlesCollection
    .find({
      feedId,
    })
    .toArray();

  debug({ mongoResult }, "mongoResult");

  const articlesList = mongoResult.map(mongoToObject<Article>);

  debug({ articlesList }, "articlesList");

  return articlesList;
}

export async function addArticle(originalArticle: Article, feedId: Feed["id"]) {
  const article = Object.assign({}, originalArticle);
  const feedsCollection = await feeds();

  const feed = await feedsCollection.findOne({
    _id: new ObjectId(feedId),
  });

  debug({ feed }, "feed");

  if (!feed) {
    throw new NotFoundError("No feed found", { feedId });
  }

  const articlesCollection = await articles();

  const { insertedId } = await articlesCollection.insertOne({
    ...article,
    feedId,
  });

  debug({ insertedId }, "mongoResult");

  const articleResult = mongoToObject<Article>({
    ...article,
    _id: insertedId,
  });

  debug({ articleResult }, "addArticle result");

  return articleResult;
}

export async function getArticle(id: Article["id"]): Promise<Article> {
  const articlesCollection = await articles();

  const mongoResult = await articlesCollection.findOne(
    objectToMongo({
      id,
    }),
  );

  debug({ mongoResult }, "mongoResult");

  if (!mongoResult) {
    throw new NotFoundError("No article found", { id });
  }

  const article = mongoToObject<Article>(mongoResult);

  debug({ article }, "article");

  return article;
}

export async function updateArticle(
  originalArticle: Article,
  id: Article["id"],
) {
  const article = Object.assign({}, originalArticle);
  const articlesCollection = await articles();

  const mongoResult = await articlesCollection.updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: article,
    },
  );

  debug({ mongoResult }, "mongoResult");

  if (!mongoResult.matchedCount) {
    throw new NotFoundError("No article found", { id });
  }

  return {
    id,
  };
}
