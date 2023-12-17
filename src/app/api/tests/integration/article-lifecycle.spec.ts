import { Feed, Article } from "@/types";
import { testArticles, testFeeds, testUser } from "@/app/api/models/testData";
import { omit } from "../../utils";
import { createHandler } from "../../createHandler";
import { Articles } from "../../models/articles";
import { Feeds } from "../../models/feeds";

const user = testUser;
const getArticles = createHandler(Articles, "getAll");
const getArticle = createHandler(Articles, "get");
const deleteArticle = createHandler(Articles, "delete");
const createArticle = createHandler(Articles, "create");
const getFeeds = createHandler(Feeds, "getAll");
const deleteFeed = createHandler(Feeds, "delete");
const addFeed = createHandler(Feeds, "create");

describe("article lifecycle tests", () => {
  let feedId: Feed["id"];
  beforeAll(async () => {
    // Get all feeds
    const { data: allFeeds } = await getFeeds({
      user,
    });

    // Get all articles from all feeds
    const allArticles = (
      await Promise.all(
        allFeeds.map(async (feed: Feed) => {
          const { data: articles } = await getArticles({
            params: {
              feedId: feed.id,
            },
            user,
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
          user,
        });

        expect(message).toMatchSnapshot();
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
          user,
        });

        expect(message).toMatchSnapshot();
        expect(data.id).toBe(feed.id);
      }),
    );

    // Create feed
    const { data, message } = await addFeed({
      body: {
        ...testFeeds[0],
      },
      user,
    });
    feedId = data.id;
  });

  test("should be able to add a new article", async () => {
    const { data, message } = await createArticle({
      body: {
        ...testArticles[0],
        feedId,
      },
      params: {
        feedId,
      },
      user,
    });

    expect(message).toMatchSnapshot();
    expect(omit(data, ["id", "feedId"])).toEqual(
      omit(testArticles[0], ["id", "feedId"]),
    );
    testArticles[0].id = data.id;
    testArticles[0].feedId = data.feedId;
  });

  test("should be able to add a second article", async () => {
    const { data, message } = await createArticle({
      body: {
        ...testArticles[1],
        feedId,
      },
      params: {
        feedId,
      },
      user,
    });

    expect(message).toMatchSnapshot();
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
      user,
    });

    expect(message).toMatchSnapshot();
    expect(data).toEqual(
      testArticles.sort(
        (a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime(),
      ),
    );
  });

  test("should be able to delete an article", async () => {
    const { data, message } = await deleteArticle({
      params: {
        articleId: testArticles[0].id,
      },
      user,
    });

    expect(message).toMatchSnapshot();
    expect(data.id).toBe(testArticles[0].id);
  });

  test("should be able to get all articles after delete", async () => {
    const { data, message } = await getArticles({
      params: {
        feedId,
      },
      user,
    });

    expect(message).toMatchSnapshot();
    expect(data).toEqual([testArticles[1]]);
  });

  test("should not be able to get a deleted article", async () => {
    expect(
      getArticle({
        params: {
          articleId: testArticles[0].id,
        },
        user,
      }),
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  test("should not be able to update a deleted article", async () => {
    expect(
      deleteArticle({
        params: {
          articleId: testArticles[0].id,
        },
        user,
      }),
    ).rejects.toThrowErrorMatchingSnapshot();
  });

  test("should be able to delete a second article", async () => {
    const { data, message } = await deleteArticle({
      params: {
        articleId: testArticles[1].id,
      },
      user,
    });

    expect(message).toMatchSnapshot();
    expect(data.id).toBe(testArticles[1].id);
  });

  test("should be able to get all articles after delete", async () => {
    const { data, message } = await getArticles({
      params: {
        feedId,
      },
      user,
    });

    expect(message).toMatchSnapshot();
    expect(data).toEqual([]);
  });
});
