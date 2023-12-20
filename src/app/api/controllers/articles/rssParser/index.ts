import { Article } from "@/types";
import { XMLParser } from "fast-xml-parser";
import * as logger from "../../../logger";
import { ServerError } from "@/app/api/errors";
import RSSParser from "rss-parser";

type RSSFeed = {
  title: string;
  link: string;
  description: string;
  image: string;
  item: RSSItem[];
};

type RSSItem = {
  title: string;
  link: string;
  pubDate: string;
  date: string;
  image: string;
  [key: string]: string;
};

export async function getParsedArticles(url: string): Promise<ParsedArticle[]> {
  logger.debug({ url }, "Fetching articles from feed");

  const rssParser: RSSParser<RSSFeed, RSSItem> = new RSSParser({
    customFields: {
      feed: ["image"],
      item: ["image"],
    },
  });

  const rssFeed = await rssParser.parseURL(url);

  const rssItems = rssFeed.items;

  logger.debug({ rssItems }, "Fetched articles from feed");

  return rssToArticles(rssItems);
}

export function rssToArticles(rss: RSSItem[]): ParsedArticle[] {
  const articles: ParsedArticle[] = rss.map((item: RSSItem) => ({
    title: getTitle(item),
    summary: getSummary(item),
    content: getContent(item),
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

export function getSummary(item: RSSItem) {
  const description =
    getSimilarField(item, "description") ||
    getSimilarField(item, "summary") ||
    getSimilarField(item, "subtitle") ||
    getSimilarField(item, "contentSnippet") ||
    getSimilarField(item, "content");

  if (!description) {
    throw new ServerError("No description found", { item });
  }
  return description;
}

export function getContent(item: RSSItem) {
  const content =
    getSimilarField(item, "content") ||
    getSimilarField(item, "contentSnippet") ||
    getSimilarField(item, "summary") ||
    getSimilarField(item, "description") ||
    getSimilarField(item, "subtitle");

  if (!content) {
    throw new ServerError("No content found", { item });
  }
  return content;
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

export function getSimilarField(item: RSSItem, field: keyof RSSItem) {
  if (item[field]) {
    return item[field];
  }
  for (const [key, value] of Object.entries(item)) {
    if (key.match(new RegExp(field as never, "i"))) {
      return value;
    }
  }
}

export type ParsedArticle = Partial<Article> & {
  title: string;
  summary: string;
  href: string;
};
