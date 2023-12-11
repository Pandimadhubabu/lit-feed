import { debug } from "@/app/api/logger";
import { Article, Feed, User } from "@/types";
import { articles, feeds, mongoToObject, objectToMongo } from "../mongo";
import { ObjectId } from "mongodb";
import { NotFoundError } from "@/app/api/errors";

class ArticlesRepository {
  constructor(private user: User) {}

  async getArticles(feedId: Feed["id"]): Promise<Article[]> {
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
  async addArticle(originalArticle: Article, feedId: Feed["id"]) {
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
  async getArticle(id: Article["id"]): Promise<Article> {
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
  async deleteArticle(id: Article["id"]) {
    const articlesCollection = await articles();

    const mongoResult = await articlesCollection.deleteOne({
      _id: new ObjectId(id),
    });

    debug({ mongoResult }, "mongoResult");

    if (!mongoResult.deletedCount) {
      throw new NotFoundError("No article found", { id });
    }

    return {
      id,
    };
  }
  async updateArticle(originalArticle: Article, id: Article["id"]) {
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
}

let repositoryStorage = new WeakMap<User, ArticlesRepository>();
export function createRepository(user: User): ArticlesRepository {
  let articlesRepository = repositoryStorage.get(user);
  if (articlesRepository) {
    return articlesRepository;
  }
  articlesRepository = new ArticlesRepository(user);
  repositoryStorage = new WeakMap();
  repositoryStorage.set(user, articlesRepository);
  return articlesRepository;
}
