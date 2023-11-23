import { Feed } from "@/types";
import { feeds, mongoToObject, objectToMongo } from "../mongo";
import { ObjectId } from "mongodb";
import { NotFoundError } from "@/app/api/errors";
import * as logger from "@/app/api/logger";

export async function getFeeds(): Promise<Feed[]> {
  const feedsCollection = await feeds();

  const mongoResult = await feedsCollection.find().toArray();

  logger.debug({ mongoResult }, "mongoResult");

  const feedsList = mongoResult.map(mongoToObject<Feed>);

  logger.debug({ feedsList }, "feedsList");

  return feedsList;
}

export async function addFeed(feed: Feed) {
  const feedsCollection = await feeds();

  const { insertedId } = await feedsCollection.insertOne(feed);

  logger.debug({ insertedId }, "mongoResult");

  const feedResult = mongoToObject<Feed>({
    ...feed,
    _id: insertedId,
  });

  logger.debug({ feedResult }, "addFeed result");

  return feedResult;
}

export async function updateFeed(feed: Feed, id: Feed["id"]) {
  const feedsCollection = await feeds();

  const mongoResult = await feedsCollection.updateOne(
    {
      _id: new ObjectId(id),
    },
    {
      $set: feed,
    },
  );

  logger.debug({ mongoResult }, "mongoResult");

  if (!mongoResult.matchedCount) {
    throw new NotFoundError("No feed found to update", { id });
  }
}

export async function deleteFeed(id: Feed["id"]) {
  const feedsCollection = await feeds();

  const mongoResult = await feedsCollection.deleteOne({
    _id: new ObjectId(id),
  });

  logger.debug({ mongoResult }, "mongoResult");

  if (!mongoResult.deletedCount) {
    throw new NotFoundError("No feed found to delete", { id });
  }
}
