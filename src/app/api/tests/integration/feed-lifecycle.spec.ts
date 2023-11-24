import { testFeeds } from "@/app/api/models/testData";
import { Feed } from "@/types";
import { omit } from "../../utils";
import { getFeeds } from "../../feeds/getFeeds";
import { deleteFeed } from "../../feeds/[feedId]/deleteFeed";
import { addFeed } from "../../feeds/addFeed";
import { updateFeed } from "../../feeds/[feedId]/updateFeed";
import { getFeed } from "../../feeds/[feedId]/getFeed";

describe("feed lifecycle tests", () => {
  beforeAll(async () => {
    // Get all feeds
    const { data: allFeeds } = await getFeeds();

    // Delete all feeds
    await Promise.all(
      allFeeds.map(async (feed: Feed) => {
        const { data, message } = await deleteFeed({
          params: {
            feedId: feed.id,
          },
        });

        expect(message).toBe("Feed deleted");
        expect(data.id).toBe(feed.id);
      }),
    );
  });

  test("should be able to add a new feed", async () => {
    const { data, message } = await addFeed({
      body: testFeeds[0],
    });

    expect(message).toBe("Feed added");
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
    });

    expect(message).toBe("Feed updated");

    expect(data.id).toBe(testFeeds[0].id);

    testFeeds[0].name = nameAfterUpdate;
  });

  test("should be able to get a feed", async () => {
    const { data, message } = await getFeed({
      params: {
        feedId: testFeeds[0].id,
      },
    });

    expect(message).toBe("Feed retrieved");
    expect(omit(data, ["id"])).toEqual(omit(testFeeds[0], ["id"]));
  });

  test("should be able to add a second feed", async () => {
    const { data, message } = await addFeed({
      body: testFeeds[1],
    });

    expect(message).toBe("Feed added");
    expect(omit(data, ["id"])).toEqual(omit(testFeeds[1], ["id"]));
    testFeeds[1].id = data.id;
  });

  test("should be able to get all feeds", async () => {
    const { data, message } = await getFeeds();

    expect(message).toBe("Feeds retrieved");

    expect(data.map((feed: Feed) => omit(feed, ["id"]))).toEqual(
      testFeeds.map((feed: Feed) => omit(feed, ["id"])),
    );
  });

  test("should be able to delete a feed", async () => {
    const { data, message } = await deleteFeed({
      params: {
        feedId: testFeeds[0].id,
      },
    });
    expect(message).toBe("Feed deleted");
    expect(data.id).toBe(testFeeds[0].id);
  });

  test("should be able to get all feeds after delete", async () => {
    const { data, message } = await getFeeds();

    expect(message).toBe("Feeds retrieved");

    expect(data.map((feed: Feed) => omit(feed, ["id"]))).toEqual([
      omit(testFeeds[1], ["id"]),
    ]);
  });

  test("should not be able to get a deleted feed", async () => {
    expect(
      getFeed({ params: { feedId: testFeeds[0].id } }),
    ).rejects.toThrowErrorMatchingSnapshot(`"Feed not found"`);
  });

  test("should not be able to update a deleted feed", async () => {
    expect(
      updateFeed({
        params: { feedId: testFeeds[0].id },
        body: { ...testFeeds[0], name: "new name" },
      }),
    ).rejects.toThrowErrorMatchingSnapshot(`"Feed not found"`);
  });

  test("should not be able to delete a deleted feed", async () => {
    expect(
      deleteFeed({ params: { feedId: testFeeds[0].id } }),
    ).rejects.toThrowErrorMatchingSnapshot(`"Feed not found"`);
  });

  test("should be able to delete a second feed", async () => {
    const { data, message } = await deleteFeed({
      params: {
        feedId: testFeeds[1].id,
      },
    });

    expect(message).toBe("Feed deleted");
    expect(data.id).toBe(testFeeds[1].id);
  });

  test("should return an empty array when getting all feeds after delete", async () => {
    const { data, message } = await getFeeds();

    expect(message).toBe("Feeds retrieved");

    expect(data).toEqual([]);
  });
});
