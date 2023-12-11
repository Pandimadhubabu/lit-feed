import { testArticles, testFeeds, testUser } from "../testData";
import { Article, Feed } from "@/types";
import { createRepository } from ".";

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

const articles = createRepository(testUser);
describe("index.ts tests", () => {
  test("getAllArticles should return an array", async () => {
    const feed = testFeeds[0];
    const articlesList = await articles.getArticles(feed.id);
    expect(articlesList).toEqual(testArticles);
  });

  test("addArticle should return an object", async () => {
    const feed = testFeeds[0];
    const article = testArticles[0];
    const result = await articles.addArticle(article, feed.id);
    expect(typeof result).toBe("object");
  });

  test("getArticle should return an object", async () => {
    const articleId: Article["id"] = "testId";
    const article = await articles.getArticle(articleId);
    expect(typeof article).toBe("object");
  });

  test("deleteArticle should return an id", async () => {
    const articleId: Article["id"] = testArticles[0].id;
    const { id } = await articles.deleteArticle(articleId);
    expect(id).toBe(articleId);
  });

  test("updateArticle should return an object with matchedCount and modifiedCount", async () => {
    const article = testArticles[0];
    const result = await articles.updateArticle(article, article.id);
    expect(result).toEqual({ id: article.id });
  });
});
