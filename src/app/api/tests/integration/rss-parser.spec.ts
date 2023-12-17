import { getParsedArticles } from "../../controllers/articles/rssParser";

describe("RSS Parser", () => {
  describe("getParsedArticles", () => {
    it("should parse RSS feeds", async () => {
      const result = await getParsedArticles(
        "https://www.npr.org/rss/rss.php?id=1001",
      );

      expect(result.length).toBeGreaterThan(0);
      expect(result[0].title).toBeDefined();
      expect(result[0].summary).toBeDefined();
      expect(result[0].href).toBeDefined();
      expect(result[0].date).toBeDefined();
    });
  });
});
