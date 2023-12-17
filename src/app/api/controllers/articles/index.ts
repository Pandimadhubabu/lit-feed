import { Article, Feed } from "@/types";
import * as logger from "../../logger";
import { Repository, createRepository } from "../../models/Repository";
import { Articles } from "../../models/articles";
import { Feeds } from "../../models/feeds";
import { ParsedArticle, getParsedArticles } from "./rssParser";

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

    const parsedArticles = await getParsedArticles(feed.href);

    const newArticles = parsedArticles.filter(
      (parsedArticle) =>
        !oldArticles.find(
          (oldArticle) => oldArticle.href === parsedArticle.href,
        ),
    );

    if (newArticles.length === 0) {
      logger.debug({ feed }, "No new articles");
      return;
    }

    const articles = await enrichPartialArticles({
      parsedArticles: newArticles,
      feed,
    });

    logger.debug({ articles }, "Enriched articles");
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
        updatedAt: new Date().toISOString(),
      },
    });

    logger.debug({ feed }, "Updated feed");
  }
}

function enrichPartialArticles({
  parsedArticles,
  feed,
}: {
  parsedArticles: ParsedArticle[];
  feed: Feed;
}): Article[] {
  return parsedArticles.map((parsedArticle) => ({
    ...parsedArticle,
    feedId: feed.id,
    isRead: false,
    isSaved: false,
    feedName: feed.name,
    id: "",
  }));
}
