import { Feed } from "@/types";
import { logger } from "@/utils";
import { feeds, mongoToObject, objectToMongo } from "../mongo";

export async function getFeeds(): Promise<Feed[]> {
  const feedsCollection = await feeds();

  const mongoResult = await feedsCollection.find().toArray();

  logger.debug("mongoResult", mongoResult);

  const feedsList = mongoResult.map(mongoToObject<Feed>);

  logger.debug("feedsList", feedsList);

  return feedsList;
}

export async function addFeed(feed: Feed) {
  const feedsCollection = await feeds();

  const mongoResult = await feedsCollection.insertOne(feed);

  logger.debug("mongoResult", mongoResult);

  const feedResult = mongoToObject<Feed>((mongoResult as any).ops[0]);
  logger.debug("addFeed result", feedResult);

  return feedResult;
}

export async function updateFeed(feed: Feed) {
  const feedsCollection = await feeds();

  const mongoResult = await feedsCollection.updateOne(objectToMongo(feed), {
    $set: feed,
  });

  logger.debug("mongoResult", mongoResult);

  const feedResult = mongoToObject<Feed>(mongoResult);
  logger.debug("updateFeed result", feedResult);

  return feedResult;
}

export async function deleteFeed(feed: Feed) {
  const feedsCollection = await feeds();

  const mongoResult = await feedsCollection.deleteOne(objectToMongo(feed));

  logger.debug("mongoResult", mongoResult);

  const feedResult = mongoToObject<Feed>(mongoResult);
  logger.debug("deleteFeed result", feedResult);

  return feedResult;
}
