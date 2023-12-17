import { testArticles, testFeeds } from "../../models/testData";

const refreshArticles = async (...args: any) => {};

describe("controllers", () => {
  describe("articles", () => {
    it("should refresh list of articles for a feed", async () => {
      const feed = testFeeds[0];
      const result = await refreshArticles(feed.id);

      expect(result).toBeUndefined();
    });
  });
});
