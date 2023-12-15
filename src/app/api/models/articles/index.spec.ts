import { testArticles, testFeeds, testUser } from "../testData";
import { Articles } from ".";
import { createRepository } from "../Repository";
import { Article, Feed } from "@/types";

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

const articles = createRepository(Articles, testUser);
describe("index.ts tests", () => {
  let articleId: Article["id"];
  test("getAllArticles should return an array", async () => {
    const feed = testFeeds[0];
    const articlesList = await articles.getAll({ params: { feedId: feed.id } });
    expect(articlesList).toEqual(testArticles);
  });

  test("createArticles should return an object", async () => {
    const feed = testFeeds[0];
    const article = testArticles[0];
    const result = await articles.create({
      params: { feedId: feed.id },
      body: article,
    });
    articleId = result.id;
    expect(typeof result).toBe("object");
  });

  test("getArticle should return an object", async () => {
    const article = await articles.get({
      params: { articleId: articleId },
    });
    expect(typeof article).toBe("object");
  });

  test("updateArticle should return an object with matchedCount and modifiedCount", async () => {
    const article = testArticles[0];
    const result = await articles.update({
      params: { articleId },
      body: article,
    });
    expect(result).toEqual({ id: article.id });
  });

  test("deleteArticle should return an id", async () => {
    const { id } = await articles.delete({
      params: { articleId },
    });
    expect(id).toBe(articleId);
  });
});
