import { testFeeds, testUser } from "@/app/api/models/testData";
import { Feed } from "@/types";
import { omit } from "../../utils";
import { Feeds } from "../../models/feeds";
import { createHandler } from "../../createHandler";

const user = testUser;
const secondUser = {
  ...testUser,
  id: "245b23984f233d32b233f2f4",
};

const getFeeds = createHandler(Feeds, "getAll");
const deleteFeed = createHandler(Feeds, "delete");
const addFeed = createHandler(Feeds, "create");
const updateFeed = createHandler(Feeds, "update");
const getFeed = createHandler(Feeds, "get");

describe("feed lifecycle tests", () => {
  beforeAll(async () => {
    // Get all feeds
    const { data: allFeeds } = await getFeeds({
      user,
    });

    // Delete all feeds
    await Promise.all(
      allFeeds.map(async (feed: Feed) => {
        const { data, message } = await deleteFeed({
          params: {
            feedId: feed.id,
          },
          user,
        });

        expect(message).toMatchSnapshot();
        expect(data.id).toBe(feed.id);
      }),
    );
  });

  test("should be able to add a new feed", async () => {
    const { data, message } = await addFeed({
      body: {
        ...testFeeds[0],
      },
      user,
    });

    expect(message).toMatchSnapshot();
    expect(omit(data, ["id"])).toEqual(omit(testFeeds[0], ["id"]));
    testFeeds[0].id = data.id;
  });

  test("should be able to update a feed", async () => {
    const nameAfterUpdate = "Updated name";

    const { data, message } = await updateFeed({
      params: {
        feedId: testFeeds[0].id,
      },
      body: {
        ...testFeeds[0],
        name: nameAfterUpdate,
      },
      user,
    });

    expect(message).toMatchSnapshot();

    expect(data.id).toBe(testFeeds[0].id);

    testFeeds[0].name = nameAfterUpdate;
  });

  test("should be able to get a feed", async () => {
    const { data, message } = await getFeed({
      params: {
        feedId: testFeeds[0].id,
      },
      user,
    });

    expect(message).toMatchSnapshot();
    expect(omit(data, ["id", "updatedAt"])).toEqual(
      omit(testFeeds[0], ["id", "updatedAt"]),
    );
  });

  test("should be able to add a second feed", async () => {
    const { data, message } = await addFeed({
      body: {
        ...testFeeds[1],
      },
      user,
    });

    expect(message).toMatchSnapshot();
    expect(omit(data, ["id"])).toEqual(omit(testFeeds[1], ["id"]));
    testFeeds[1].id = data.id;
  });

  test("should be able to get all feeds", async () => {
    const { data, message } = await getFeeds({
      user,
    });

    expect(message).toMatchSnapshot();

    expect(data.map((feed: Feed) => omit(feed, ["id", "updatedAt"]))).toEqual(
      testFeeds
        .slice(0, 2)
        .map((feed: Feed) => omit(feed, ["id", "updatedAt"])),
    );
  });

  describe("feed lifecycle tests for another user", () => {
    test("should not be able to get feeds for another user", async () => {
      const { data, message } = await getFeeds({ user: secondUser });

      expect(message).toMatchSnapshot();
      expect(data).toEqual([]);
    });

    test("should not be able to get a feed for another user", async () => {
      expect(
        getFeed({ params: { feedId: testFeeds[0].id }, user: secondUser }),
      ).rejects.toThrow(`No feed found`);
    });

    test("should not be able to update a feed for another user", async () => {
      expect(
        updateFeed({
          params: { feedId: testFeeds[0].id },
          body: { ...testFeeds[0], name: "new name" },
          user: secondUser,
        }),
      ).rejects.toThrow(`No feed found to update`);
    });

    test("should not be able to delete a feed for another user", async () => {
      expect(
        deleteFeed({ params: { feedId: testFeeds[0].id }, user: secondUser }),
      ).rejects.toThrow(`No feed found to delete`);
    });
  });

  test("should be able to delete a feed", async () => {
    const { data, message } = await deleteFeed({
      params: {
        feedId: testFeeds[0].id,
      },
      user,
    });
    expect(message).toMatchSnapshot();
    expect(data.id).toBe(testFeeds[0].id);
  });

  test("should be able to get all feeds after delete", async () => {
    const { data, message } = await getFeeds({
      user,
    });

    expect(message).toMatchSnapshot();

    expect(data.map((feed: Feed) => omit(feed, ["id"]))).toEqual([
      omit(testFeeds[1], ["id"]),
    ]);
  });

  test("should not be able to get a deleted feed", async () => {
    expect(
      getFeed({ params: { feedId: testFeeds[0].id }, user }),
    ).rejects.toThrow(`No feed found`);
  });

  test("should not be able to update a deleted feed", async () => {
    expect(
      updateFeed({
        params: { feedId: testFeeds[0].id },
        body: { ...testFeeds[0], name: "new name" },
        user,
      }),
    ).rejects.toThrow(`No feed found to update`);
  });

  test("should not be able to delete a deleted feed", async () => {
    expect(
      deleteFeed({ params: { feedId: testFeeds[0].id }, user }),
    ).rejects.toThrow(`No feed found to delete`);
  });

  test("should be able to delete a second feed", async () => {
    const { data, message } = await deleteFeed({
      params: {
        feedId: testFeeds[1].id,
      },
      user,
    });

    expect(message).toMatchSnapshot();
    expect(data.id).toBe(testFeeds[1].id);
  });

  test("should return an empty array when getting all feeds after delete", async () => {
    const { data, message } = await getFeeds({
      user,
    });

    expect(message).toMatchSnapshot();

    expect(data).toEqual([]);
  });
});
