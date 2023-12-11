import { NotFoundError } from "@/app/api/errors";
import { debug } from "@/app/api/logger";
import { Article, Feed } from "@/types";
import { ObjectId } from "mongodb";
import { Repository } from "../Repository";
import { articles, feeds, mongoToObject, objectToMongo } from "../mongo";

export class Articles extends Repository<Article> {
  async getAll({
    params: { feedId },
  }: {
    params: { feedId: Feed["id"] };
  }): Promise<Article[]> {
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

  async create({
    params: { feedId },
    body,
  }: {
    params: { feedId: Feed["id"] };
    body: Article;
  }): Promise<Article> {
    const article = Object.assign({}, body);
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

  async get({
    params: { articleId },
  }: {
    params: { articleId: Article["id"] };
  }): Promise<Article> {
    const articlesCollection = await articles();

    const mongoResult = await articlesCollection.findOne(
      objectToMongo({
        id: articleId,
      }),
    );

    debug({ mongoResult }, "mongoResult");

    if (!mongoResult) {
      throw new NotFoundError("No article found", { articleId });
    }

    const article = mongoToObject<Article>(mongoResult);

    debug({ article }, "article");

    return article;
  }

  async delete({
    params: { articleId },
  }: {
    params: { articleId: Article["id"] };
  }) {
    const articlesCollection = await articles();

    const mongoResult = await articlesCollection.deleteOne({
      _id: new ObjectId(articleId),
    });

    debug({ mongoResult }, "mongoResult");

    if (!mongoResult.deletedCount) {
      throw new NotFoundError("No article found", { articleId });
    }

    return {
      id: articleId,
    };
  }

  async update({
    params: { articleId },
    body,
  }: {
    params: { articleId: Article["id"] };
    body: Article;
  }) {
    const article = Object.assign({}, body);
    const articlesCollection = await articles();

    const mongoResult = await articlesCollection.updateOne(
      {
        _id: new ObjectId(articleId),
      },
      {
        $set: article,
      },
    );

    debug({ mongoResult }, "mongoResult");

    if (!mongoResult.matchedCount) {
      throw new NotFoundError("No article found", { articleId });
    }

    return {
      id: articleId,
    };
  }
}
