import { Article, Feed, User } from "@/types";
import * as logger from "../../logger";
import { Repository, createRepository } from "../../models/Repository";
import { Articles } from "../../models/articles";
import { Feeds } from "../../models/feeds";
import { XMLParser } from "fast-xml-parser";

export class ArticlesController extends Repository<Article> {
  async execute({
    params: { feedId },
  }: {
    params: { feedId: Feed["id"] };
  }): Promise<void> {
    const feedsRepository = await createRepository(Feeds, this.user);
    const feed = await feedsRepository.get({ params: { feedId } });

    const articlesRepository = await createRepository(Articles, this.user);

    const oldArticles = await articlesRepository.getAll({ params: { feedId } });

    const partialArticles = await getPartialArticles(feed.href);

    const newArticles = partialArticles.filter(
      (partialArticle) =>
        !oldArticles.find(
          (oldArticle) => oldArticle.href === partialArticle.href,
        ),
    );

    if (newArticles.length === 0) {
      logger.debug({ feed }, "No new articles");
      return;
    }

    const articles = await enrichPartialArticles({
      partialArticles: newArticles,
      feed,
    });

    const result: Article[] = [];
    for (const article of articles) {
      article.feedId = feed.id;

      const savedArticle = await articlesRepository.create({
        params: { feedId: feed.id },
        body: article,
      });

      result.push(savedArticle);
    }

    logger.debug({ result }, "Refreshed articles");

    await feedsRepository.update({
      params: { feedId },
      body: {
        ...feed,
        updatedAt: new Date(),
      },
    });

    logger.debug({ feed }, "Updated feed");
  }
}

function enrichPartialArticles({
  partialArticles,
  feed,
}: {
  partialArticles: PartialArticle[];
  feed: Feed;
}): Article[] {
  const articles: Article[] = [];
  for (const partialArticle of partialArticles) {
    const article: Article = {
      ...partialArticle,
      feedId: feed.id,
      isRead: false,
      isSaved: false,
      feedName: feed.name,
      id: "",
    };

    articles.push(article);
  }

  logger.debug({ articles }, "Enriched articles");
  return articles;
}

async function getPartialArticles(url: string): Promise<PartialArticle[]> {
  logger.debug({ url }, "Fetching articles from feed");
  const rss = await fetch(url);

  const rssText = await rss.text();
  logger.debug({ rssText }, "Fetched articles from feed");

  return rssToArticles(rssText);
}

export function rssToArticles(rss: string): PartialArticle[] {
  const parser = new XMLParser();
  const jsonObj = parser.parse(rss);

  const items = jsonObj.rss.channel.item;

  const articles: PartialArticle[] = [];

  for (const item of items) {
    const article: PartialArticle = {
      title: item.title,
      summary: item.description,
      href: item.link,
      date: item.pubDate,
      image: item.image,
    };
    articles.push(article);
  }

  logger.debug({ articles }, "Parsed articles from feed");

  return articles;
}

type PartialArticle = Partial<Article> & {
  title: string;
  summary: string;
  href: string;
  date: string;
  image?: string;
};
