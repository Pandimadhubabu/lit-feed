if (!process.env.MONGO_URL) {
  throw new Error(
    "Please define the MONGO_URL environment variable inside .env.local",
  );
}

export const mongoUrl = process.env.MONGO_URL;
export const feedDatabaseName = process.env.MONGO_DB_NAME || "feed";
export const feedsCollectionName =
  process.env.MONGO_FEEDS_COLLECTION_NAME || "feeds";
export const articlesCollectionName =
  process.env.MONGO_ARTICLES_COLLECTION_NAME || "articles";
