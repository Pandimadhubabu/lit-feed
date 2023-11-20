// index.test.ts
import { testArticles, testFeeds } from "../testData";
import { getAllArticles, getArticle, updateArticle } from "./index";
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
  }),
  mongoToObject: jest.fn((article) => article),
  objectToMongo: jest.fn((article) => article),
}));

describe("index.ts tests", () => {
  test("getAllArticles should return an array", async () => {
    const feed = testFeeds[0];
    const articlesList = await getAllArticles(feed);
    expect(articlesList).toEqual(testArticles);
  });

  test("getArticle should return an object", async () => {
    const articleId: Article["id"] = "testId";
    const article = await getArticle(articleId);
    expect(typeof article).toBe("object");
  });

  test("updateArticle should return an object with matchedCount and modifiedCount", async () => {
    const article = testArticles[0];
    const result = await updateArticle(article);
    expect(result).toHaveProperty("matchedCount");
    expect(result).toHaveProperty("modifiedCount");
  });
});
