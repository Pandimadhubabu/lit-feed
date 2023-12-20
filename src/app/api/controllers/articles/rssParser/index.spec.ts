import {
  getSummary,
  getLink,
  getParsedArticles,
  getRSSItems,
  getSimilarField,
  getTitle,
  rssToArticles,
} from ".";

describe("RSS Parser", () => {
  describe("rssToArticles", () => {
    it("should parse RSS items", () => {
      const result = rssToArticles([
        {
          title: "title",
          description: "description",
          link: "link",
          pubDate: "pubDate",
          image: "image",
        },
      ]);

      expect(result.length).toBeGreaterThan(0);
      expect(result[0].title).toBe("title");
      expect(result[0].summary).toBe("description");
      expect(result[0].href).toBe("link");
      expect(result[0].date).toBeDefined();
      expect(result[0].image).toBe("image");
    });
  });

  describe("getTitle", () => {
    it("should get the title", () => {
      const result = getTitle({
        title: "title",
      });

      expect(result).toBe("title");
    });

    it("should get a similar field", () => {
      const result = getTitle({
        "title 2": "title",
      });

      expect(result).toBe("title");
    });

    it("should throw if no title is found", () => {
      expect(() => getTitle({})).toThrow("No title found");
    });
  });

  describe("getDescription", () => {
    it("should get the description", () => {
      const result = getSummary({
        description: "description",
      });

      expect(result).toBe("description");
    });

    it("should get a similar field", () => {
      const result = getSummary({
        "description 2": "description",
      });

      expect(result).toBe("description");
    });

    it("should throw if no description is found", () => {
      expect(() => getSummary({})).toThrow("No description found");
    });
  });

  describe("getLink", () => {
    it("should get the link", () => {
      const result = getLink({
        link: "link",
      });

      expect(result).toBe("link");
    });

    it("should get a similar field", () => {
      const result = getLink({
        "link 2": "link",
      });

      expect(result).toBe("link");
    });

    it("should throw if no link is found", () => {
      expect(() => getLink({})).toThrow("No link found");
    });
  });

  describe("getSimilarField", () => {
    it("should get the field", () => {
      const result = getSimilarField(
        {
          field: "field",
        },
        "field",
      );

      expect(result).toBe("field");
    });

    it("should get a similar field", () => {
      const result = getSimilarField(
        {
          "field 2": "field",
        },
        "field",
      );

      expect(result).toBe("field");
    });

    it("should return undefined if no field is found", () => {
      const result = getSimilarField({}, "field");

      expect(result).toBeUndefined();
    });
  });

  describe("getRSSItems", () => {
    it("should get the items from channel items", () => {
      const result = getRSSItems({
        rss: {
          channel: {
            items: ["item"],
          },
        },
      });

      expect(result).toEqual(["item"]);
    });

    it("should get the items from rdf", () => {
      const result = getRSSItems({
        rdf: {
          item: ["item"],
        },
      });

      expect(result).toEqual(["item"]);
    });

    it("should get the items from feed items", () => {
      const result = getRSSItems({
        feed: {
          items: ["item"],
        },
      });

      expect(result).toEqual(["item"]);
    });

    it("should get the items from channel item", () => {
      const result = getRSSItems({
        rss: {
          channel: {
            item: ["item"],
          },
        },
      });

      expect(result).toEqual(["item"]);
    });

    it("should get the items from entry", () => {
      const result = getRSSItems({
        entry: ["item"],
      });

      expect(result).toEqual(["item"]);
    });

    it("should fail if no items were found", () => {
      expect(() => getRSSItems({})).toThrow("No items found");
    });
  });
});
