import {
  articlesCollectionName,
  feedDatabaseName,
  feedsCollectionName,
  mongoUrl,
} from "@/app/api/config";
import { MongoDocument, Identifiable } from "@/types";
import { MongoClient, ObjectId } from "mongodb";

const client = new MongoClient(mongoUrl);

let connection: MongoClient;
// TODO: Add propoer error handling with error types
async function connectToDatabase(): Promise<MongoClient> {
  if (connection) {
    return connection;
  }
  connection = await client.connect();
  return connection;
}

function getFeedDatabase(client: MongoClient) {
  return client.db(feedDatabaseName);
}

async function getFeedCollection(client: MongoClient) {
  return getFeedDatabase(client).collection(feedsCollectionName);
}

async function getArticleCollection(client: MongoClient) {
  return getFeedDatabase(client).collection(articlesCollectionName);
}

/**
 * Returns a MongoDB collection of all feeds
 */
export async function feeds() {
  const client = await connectToDatabase();
  const collection = await getFeedCollection(client);
  return collection;
}

/**
 * Returns a MongoDB collection of all articles
 */
export async function articles() {
  const client = await connectToDatabase();
  const collection = await getArticleCollection(client);
  return collection;
}

/**
 * Converts a MongoDB result to a typed object
 */
export function mongoToObject<T>(mongoResult: unknown): T {
  const resultTyped = mongoResult as MongoDocument;

  const result = {
    ...resultTyped,
    id: resultTyped._id.toString(),
  };

  delete (result as any)._id;

  return result as T;
}

/**
 * Converts a typed object to a MongoDB object
 */
export function objectToMongo(object: Identifiable) {
  const mongoObject = {
    ...object,
    _id: new ObjectId(object.id),
  };

  delete (mongoObject as any).id;
}
