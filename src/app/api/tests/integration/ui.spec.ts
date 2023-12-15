import { Article, Feed } from "@/types";
import { createHandlerFromRepository } from "../../createHandler";
import * as logger from "../../logger";
import { Articles } from "../../models/articles";
import { Feeds } from "../../models/feeds";
import { testArticles, testFeeds } from "../../models/testData";
import { getLocalhostUser } from "../../next";

const user = getLocalhostUser();
const getArticles = createHandlerFromRepository(Articles, "getAll");
const deleteArticle = createHandlerFromRepository(Articles, "delete");
const createArticle = createHandlerFromRepository(Articles, "create");
const getFeeds = createHandlerFromRepository(Feeds, "getAll");
const deleteFeed = createHandlerFromRepository(Feeds, "delete");
const addFeed = createHandlerFromRepository(Feeds, "create");

describe("article lifecycle tests", () => {
  test("should create test data for testing the UI", async () => {
    const feedIds: string[] = [];
    const feedNames: string[] = [];
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

        expect(message).toBe("Performed delete on Articles successfully");
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

        expect(message).toBe("Performed delete on Feeds successfully");
        expect(data.id).toBe(feed.id);
      }),
    );

    for (const feed of testFeeds) {
      const { data, message } = await addFeed({
        body: feed as {},
        user,
      });
      logger.info({ data }, message);
      feedIds.push(data.id);
      feedNames.push(data.name);
    }

    for (const feedId of feedIds) {
      for (const article of testArticles) {
        const { data, message } = await createArticle({
          body: {
            ...article,
            feedId,
            feedName: feedNames[feedIds.indexOf(feedId)],
          },
          params: {
            feedId,
          },
          user,
        });

        logger.info({ data }, message);
        expect(message).toBe("Performed create on Articles successfully");
      }
    }
  });
});
