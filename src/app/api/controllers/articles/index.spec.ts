import { testFeeds } from "../../models/testData";

const refreshArticles = async (...args: any) => {};

describe("controllers", () => {
  describe("articles", () => {
    it("should refresh list of articles for a feed", async () => {
      const feed = testFeeds[0];
      const articles = await refreshArticles(feed.id);

      expect(articles).toEqual(testArticles);
    });
  });
});
