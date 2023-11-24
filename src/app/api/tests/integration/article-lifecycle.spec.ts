import { Feed, Article } from "@/types";
import { getArticles } from "../../feeds/[feedId]/articles/getArticles";
import { deleteFeed } from "../../feeds/[feedId]/deleteFeed";
import { getFeeds } from "../../feeds/getFeeds";
import { deleteArticle } from "../../feeds/[feedId]/articles/[articleId]/deleteArticle";
import { testArticles, testFeeds } from "@/models/testData";
import { addArticle } from "../../feeds/[feedId]/articles/addArticle";
import { omit } from "../../utils";
import { addFeed } from "../../feeds/addFeed";
import { getArticle } from "../../feeds/[feedId]/articles/[articleId]/getArticle";

describe("article lifecycle tests", () => {
  let feedId: Feed["id"];
  beforeAll(async () => {
    // Get all feeds
    const { data: allFeeds } = await getFeeds();

    // Get all articles from all feeds
    const allArticles = (
      await Promise.all(
        allFeeds.map(async (feed: Feed) => {
          const { data: articles } = await getArticles({
            params: {
              feedId: feed.id,
            },
          });

          return articles;
        }),
      )
    ).flat();

    // Delete all articles
    await Promise.all(
      allArticles.map(async (article: Article) => {
        const { data, message } = await deleteArticle({
          params: {
            articleId: article.id,
          },
        });

        expect(message).toBe("Article deleted");
        expect(data.id).toBe(article.id);
      }),
    );

    // Delete all feeds
    await Promise.all(
      allFeeds.map(async (feed: Feed) => {
        const { data, message } = await deleteFeed({
          params: {
            feedId: feed.id,
          },
        });

        expect(message).toBe("Feed deleted");
        expect(data.id).toBe(feed.id);
      }),
    );

    // Create feed
    const { data, message } = await addFeed({
      body: testFeeds[0],
    });
    feedId = data.id;
  });

  test("should be able to add a new article", async () => {
    const { data, message } = await addArticle({
      body: {
        ...testArticles[0],
        feedId,
      },
      params: {
        feedId,
      },
    });

    expect(message).toBe("Article added");
    expect(omit(data, ["id", "feedId"])).toEqual(
      omit(testArticles[0], ["id", "feedId"]),
    );
    testArticles[0].id = data.id;
    testArticles[0].feedId = data.feedId;
  });

  test("should be able to add a second article", async () => {
    const { data, message } = await addArticle({
      body: {
        ...testArticles[1],
        feedId,
      },
      params: {
        feedId,
      },
    });

    expect(message).toBe("Article added");
    expect(omit(data, ["id", "feedId"])).toEqual(
      omit(testArticles[1], ["id", "feedId"]),
    );
    testArticles[1].id = data.id;
    testArticles[1].feedId = data.feedId;
  });

  test("should be able to get all articles", async () => {
    const { data, message } = await getArticles({
      params: {
        feedId,
      },
    });

    expect(message).toBe("Articles retrieved");
    expect(data).toEqual(testArticles);
  });

  test("should be able to delete an article", async () => {
    const { data, message } = await deleteArticle({
      params: {
        articleId: testArticles[0].id,
      },
    });

    expect(message).toBe("Article deleted");
    expect(data.id).toBe(testArticles[0].id);
  });

  test("should be able to get all articles after delete", async () => {
    const { data, message } = await getArticles({
      params: {
        feedId,
      },
    });

    expect(message).toBe("Articles retrieved");
    expect(data).toEqual([testArticles[1]]);
  });

  test("should not be able to get a deleted article", async () => {
    expect(
      getArticle({
        params: {
          articleId: testArticles[0].id,
        },
      }),
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  test("should not be able to update a deleted article", async () => {
    expect(
      deleteArticle({
        params: {
          articleId: testArticles[0].id,
        },
      }),
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  test("should be able to delete a second article", async () => {
    const { data, message } = await deleteArticle({
      params: {
        articleId: testArticles[1].id,
      },
    });

    expect(message).toBe("Article deleted");
    expect(data.id).toBe(testArticles[1].id);
  });

  test("should be able to get all articles after delete", async () => {
    const { data, message } = await getArticles({
      params: {
        feedId,
      },
    });

    expect(message).toBe("Articles retrieved");
    expect(data).toEqual([]);
  });
});
