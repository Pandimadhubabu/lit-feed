import { Article, Feed, User } from "@/types";
import * as logger from "../../logger";
import { Repository, createRepository } from "../../models/Repository";
import { Articles as ArticlesModel } from "../../models/articles";
import { Feeds as FeedsModel } from "../../models/feeds";
import { XMLParser } from "fast-xml-parser";

export class Articles extends Repository<Article> {
  async execute({
    params: { feedId },
  }: {
    params: { feedId: Feed["id"] };
  }): Promise<void> {
    const feedsRepository = await createRepository(FeedsModel, this.user);
    const feed = await feedsRepository.get({ params: { feedId } });

    const articlesRepository = await createRepository(ArticlesModel, this.user);

    const partialArticles = await getPartialArticles(feed.href);
    const articles = await enrichPartialArticles({ partialArticles, feed });

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
