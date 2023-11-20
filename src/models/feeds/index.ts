import { debug } from "@/app/api/logger";
import { Feed } from "@/types";
import { feeds, mongoToObject, objectToMongo } from "../mongo";

export async function getFeeds(): Promise<Feed[]> {
  const feedsCollection = await feeds();

  const mongoResult = await feedsCollection.find().toArray();

  debug({ mongoResult }, "mongoResult");

  const feedsList = mongoResult.map(mongoToObject<Feed>);

  debug({ feedsList }, "feedsList");

  return feedsList;
}

export async function addFeed(feed: Feed) {
  const feedsCollection = await feeds();

  const { insertedId } = await feedsCollection.insertOne(feed);

  debug({ insertedId }, "mongoResult");

  const feedResult = mongoToObject<Feed>({
    ...feed,
    _id: insertedId,
  });
  debug({ feedResult }, "addFeed result");

  return feedResult;
}

export async function updateFeed(feed: Feed) {
  const feedsCollection = await feeds();

  const mongoResult = await feedsCollection.updateOne(objectToMongo(feed), {
    $set: feed,
  });

  debug({ mongoResult }, "mongoResult");

  const feedResult = mongoToObject<Feed>(mongoResult);
  debug({ feedResult }, "updateFeed result");

  return feedResult;
}

export async function deleteFeed(feed: Feed) {
  const feedsCollection = await feeds();

  const mongoResult = await feedsCollection.deleteOne(objectToMongo(feed));

  debug({ mongoResult }, "mongoResult");

  const feedResult = mongoToObject<Feed>(mongoResult);
  debug({ feedResult }, "deleteFeed result");

  return feedResult;
}
