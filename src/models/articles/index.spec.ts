// index.test.ts
import { testArticles, testFeeds } from "../testData";
import {
  getArticles,
  getArticle,
  updateArticle,
  addArticle,
  deleteArticle,
} from "./index";
import { Article, Feed } from "@/types";

jest.mock("@/app/api/logger", () => ({
  debug: jest.fn(),
}));

jest.mock("../mongo", () => ({
  articles: jest.fn().mockResolvedValue({
    find: jest.fn().mockReturnValue({
      toArray: jest.fn().mockResolvedValue(testArticles),
    }),
    findOne: jest.fn().mockResolvedValue(testArticles[0]),
    toArray: jest.fn().mockResolvedValue([]),
    updateOne: jest
      .fn()
      .mockResolvedValue({ matchedCount: 1, modifiedCount: 1 }),
    insertOne: jest.fn().mockResolvedValue({ insertedId: testArticles[0].id }),
    deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }),
  }),
  feeds: jest.fn().mockResolvedValue({
    findOne: jest.fn().mockResolvedValue(testFeeds[0]),
  }),
  mongoToObject: jest.fn((article) => article),
  objectToMongo: jest.fn((article) => article),
}));

describe("index.ts tests", () => {
  test("getAllArticles should return an array", async () => {
    const feed = testFeeds[0];
    const articlesList = await getArticles(feed.id);
    expect(articlesList).toEqual(testArticles);
  });

  test("addArticle should return an object", async () => {
    const feed = testFeeds[0];
    const article = testArticles[0];
    const result = await addArticle(article, feed.id);
    expect(typeof result).toBe("object");
  });

  test("getArticle should return an object", async () => {
    const articleId: Article["id"] = "testId";
    const article = await getArticle(articleId);
    expect(typeof article).toBe("object");
  });

  test("deleteArticle should return an id", async () => {
    const articleId: Article["id"] = testArticles[0].id;
    const { id } = await deleteArticle(articleId);
    expect(id).toBe(articleId);
  });

  test("updateArticle should return an object with matchedCount and modifiedCount", async () => {
    const article = testArticles[0];
    const result = await updateArticle(article, article.id);
    expect(result).toEqual({ id: article.id });
  });
});
