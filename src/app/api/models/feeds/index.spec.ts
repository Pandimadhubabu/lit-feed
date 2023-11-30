import { testFeeds } from "../testData";
import { addFeed, getFeeds } from "./index";

jest.mock("../mongo", () => ({
  feeds: jest.fn().mockResolvedValue({
    find: jest.fn().mockReturnThis(),
    toArray: jest.fn().mockResolvedValue([]),
    insertOne: jest.fn().mockResolvedValue({ insertedId: "testId" }),
  }),
  mongoToObject: jest.fn((feed) => feed),
  objectToMongo: jest.fn((feed) => feed),
}));

describe("Feeds model tests", () => {
  test("getFeeds should return an array", async () => {
    const feeds = await getFeeds();
    expect(feeds).toEqual([]);
  });

  test("addFeed should return an object with insertedId", async () => {
    const feed = testFeeds[0];
    const result = await addFeed(feed);
    expect(result).toEqual({ ...feed, _id: "testId" });
  });
});
