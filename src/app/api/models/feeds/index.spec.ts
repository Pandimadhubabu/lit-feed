import { testFeeds, testUser } from "../testData";
import { Feeds } from ".";
import { createRepository } from "../Repository";

const feedsRepository = createRepository(Feeds, testUser);

jest.mock("../mongo", () => ({
  feeds: jest.fn().mockResolvedValue({
    find: jest.fn().mockReturnThis(),
    toArray: jest.fn().mockResolvedValue([]),
    insertOne: jest.fn().mockResolvedValue({ insertedId: "testId" }),
    findOne: jest.fn().mockResolvedValue(testFeeds[0]),
    deleteOne: jest.fn().mockResolvedValue({ deletedCount: 1 }),
    updateOne: jest
      .fn()
      .mockResolvedValue({ matchedCount: 1, modifiedCount: 1 }),
  }),
  mongoToObject: jest.fn((feed) => feed),
  objectToMongo: jest.fn((feed) => feed),
}));

describe("Feeds model tests", () => {
  test("getFeeds should return an array", async () => {
    const feeds = await feedsRepository.getAll();
    expect(feeds).toEqual([]);
  });

  test("addFeed should return an object with insertedId", async () => {
    const feed = testFeeds[0];
    const result = await feedsRepository.create({ body: feed });
    expect(result).toEqual({ ...feed, _id: "testId" });
  });

  test("getFeed should return an object", async () => {
    const feedId = testFeeds[0].id;
    const feed = await feedsRepository.get({ params: { id: feedId } });
    expect(feed).toEqual(testFeeds[0]);
  });

  test("deleteFeed should return an id", async () => {
    const feedId = testFeeds[0].id;
    const { id } = await feedsRepository.delete({ params: { id: feedId } });
    expect(id).toBe(feedId);
  });

  test("updateFeed should return an object with matchedCount and modifiedCount", async () => {
    const feedId = testFeeds[0].id;
    const { id } = await feedsRepository.update({
      params: { id: feedId },
      body: {
        ...testFeeds[0],
        name: "Updated name",
      },
    });

    expect(id).toBe(feedId);
  });
});
