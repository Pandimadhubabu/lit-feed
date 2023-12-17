import { Article } from "@/types";
import { XMLParser } from "fast-xml-parser";
import * as logger from "../../../logger";
import { ServerError } from "@/app/api/errors";

export async function getParsedArticles(url: string): Promise<ParsedArticle[]> {
  logger.debug({ url }, "Fetching articles from feed");
  const rssResponse = await fetch(url);

  const rssText = await rssResponse.text();
  logger.debug({ rssText }, "Fetched articles from feed");

  const rss = new XMLParser().parse(rssText);

  const rssItems = getRSSItems(rss);

  return rssToArticles(rssItems);
}

export function rssToArticles(rss: RSSItem[]): ParsedArticle[] {
  const articles: ParsedArticle[] = rss.map((item: RSSItem) => ({
    title: getTitle(item),
    summary: getDescription(item),
    href: getLink(item),
    date: getDate(item),
    image: getImage(item),
  }));

  logger.debug({ articles }, "Parsed articles from feed");

  return articles;
}

export function getTitle(item: RSSItem) {
  const title = getSimilarField(item, "title");

  if (!title) {
    throw new ServerError("No title found", { item });
  }
  return title;
}

export function getDescription(item: RSSItem) {
  const description = getSimilarField(item, "description");

  if (!description) {
    throw new ServerError("No description found", { item });
  }
  return description;
}

export function getLink(item: RSSItem) {
  const link = getSimilarField(item, "link");

  if (!link) {
    throw new ServerError("No link found", { item });
  }
  return link;
}

export function getImage(item: RSSItem) {
  return getSimilarField(item, "image");
}

export function getDate(item: RSSItem) {
  if (item.pubDate) {
    return item.pubDate;
  }
  return getSimilarField(item, "date");
}

export function getSimilarField(item: RSSItem, field: string) {
  if (item[field]) {
    return item[field];
  }
  const keys = Object.keys(item);

  for (const key of keys) {
    if (key.match(new RegExp(field, "i"))) {
      return item[key];
    }
  }
}

export function getRSSItems(rssInput: Record<string, any>): RSSItem[] {
  const rss = rssInput?.rss || rssInput?.feed || rssInput?.rdf || rssInput;
  if (rss?.channel?.item) {
    return rss.channel.item;
  }
  if (rss?.item) {
    return rss.item;
  }
  if (rss?.channel?.entry) {
    return rss.channel.entry;
  }
  if (rss?.entry) {
    return rss.entry;
  }
  if (rss?.channel?.items) {
    return rss.channel.items;
  }
  if (rss?.items) {
    return rss.items;
  }
  throw new ServerError("No items found", { rss });
}

export type ParsedArticle = Partial<Article> & {
  title: string;
  summary: string;
  href: string;
};

type RSSItem = Record<string, string>;
