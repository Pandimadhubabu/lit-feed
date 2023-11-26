import { Article, Feed } from "@/types";
import { deleteArticle } from "../../feeds/[feedId]/articles/[articleId]/deleteArticle";
import { addArticle } from "../../feeds/[feedId]/articles/addArticle";
import { getArticles } from "../../feeds/[feedId]/articles/getArticles";
import { deleteFeed } from "../../feeds/[feedId]/deleteFeed";
import { addFeed } from "../../feeds/addFeed";
import { getFeeds } from "../../feeds/getFeeds";
import * as logger from "../../logger";

describe("article lifecycle tests", () => {
  test("should create test data for testing the UI", async () => {
    const feedIds: string[] = [];
    const feedNames: string[] = [];
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

    const feeds = [
      {
        id: "656328861718a48afe45bf70",
        name: "Stackoverflow Blog",
        href: "stackoverflow.com",
        unread: 1,
      },
      {
        id: "656328961718a48afe45bf71",
        name: "Hacker News",
        href: "hackernews.com",
        unread: 0,
      },
      {
        id: "656328a61718a48afe45bf72",
        name: "Martin Fowler",
        href: "martinfowler.com",
        unread: 0,
      },
    ];

    for (const feed of feeds) {
      const { data, message } = await addFeed({
        body: feed,
      });
      logger.info({ data }, message);
      feedIds.push(data.id);
      feedNames.push(data.name);
    }

    const articles = [
      {
        title: "Can LLMs learn from a single example?",
        summary: `I've been working on a new approach to few-shot learning, and I'm excited to share some results.`,
        href: "https://www.fast.ai/posts/2023-09-04-learning-jumps/",
        feedName: "Hacker News",
        duration: "1h",
        date: "Wed, 6 Sep 2023 00:40:05 +0000",
        id: "1",
        feedId: "1",
        isRead: false,
        isSaved: false,
      },
      {
        title: "Fine-grained caching strategies of dynamic queries",
        summary: `Today I would like to talk about caching strategies for aggregate queries over time-based data which is updated often`,
        href: "https://jensrantil.github.io/posts/fast-aggregate-queries-on-dynamic-data",
        feedName: "Hacker News",
        duration: "1h",
        date: "Wed, 20 Sep 2023 17:42:24 +0000",
        id: "2",
        feedId: "1",
        isRead: true,
        isSaved: false,
      },
    ];

    for (const feedId of feedIds) {
      for (const article of articles) {
        const { data, message } = await addArticle({
          body: {
            ...article,
            feedId,
            feedName: feedNames[feedIds.indexOf(feedId)],
          },
          params: {
            feedId,
          },
        });

        logger.info({ data }, message);
        expect(message).toBe("Article added");
      }
    }
  });
});
