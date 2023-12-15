import { NotFoundError } from "@/app/api/errors";
import * as logger from "@/app/api/logger";
import { Feed } from "@/types";
import { ObjectId } from "mongodb";
import { Repository } from "../Repository";
import { feeds, mongoToObject } from "../mongo";
export class Feeds extends Repository<Feed> {
  async create({ body }: { body: Feed }): Promise<Feed> {
    const feed = Object.assign(
      {},
      {
        ...body,
        userId: this.user.id,
        updatedAt: new Date(),
      },
    );
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

  async get({
    params: { feedId },
  }: {
    params: { feedId: Feed["id"] };
  }): Promise<Feed> {
    const feedsCollection = await feeds();

    const mongoResult = await feedsCollection.findOne({
      userId: this.user.id,
      _id: new ObjectId(feedId),
    });

    logger.debug({ mongoResult }, "mongoResult");

    if (!mongoResult) {
      throw new NotFoundError("No feed found", { feedId });
    }

    const feedResult = mongoToObject<Feed>(mongoResult);

    logger.debug({ feedResult }, "getFeed result");

    return feedResult;
  }

  async getAll(): Promise<Feed[]> {
    const feedsCollection = await feeds();

    const mongoResult = await feedsCollection
      .find({
        userId: this.user.id,
      })
      .toArray();

    logger.debug({ mongoResult }, "mongoResult");

    const feedsList = mongoResult.map(mongoToObject<Feed>);

    logger.debug({ feedsList }, "feedsList");

    return feedsList;
  }

  async delete({ params: { feedId } }: { params: { feedId: Feed["id"] } }) {
    const feedsCollection = await feeds();

    const mongoResult = await feedsCollection.deleteOne({
      userId: this.user.id,
      _id: new ObjectId(feedId),
    });

    logger.debug({ mongoResult }, "mongoResult");

    if (!mongoResult.deletedCount) {
      throw new NotFoundError("No feed found to delete", { feedId });
    }

    return {
      id: feedId,
    };
  }

  async update({
    params: { feedId },
    body,
  }: {
    params: { feedId: Feed["id"] };
    body: Feed;
  }) {
    const feed = Object.assign({}, body);
    const feedsCollection = await feeds();

    const mongoResult = await feedsCollection.updateOne(
      {
        userId: this.user.id,
        _id: new ObjectId(feedId),
      },
      {
        $set: {
          ...feed,
          updatedAt: new Date(),
        },
      },
    );

    logger.debug({ mongoResult }, "mongoResult");

    if (!mongoResult.matchedCount) {
      throw new NotFoundError("No feed found to update", { feedId });
    }

    return {
      id: feedId,
    };
  }
}
