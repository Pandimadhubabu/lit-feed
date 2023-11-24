import { testFeeds } from "@/models/testData";
import { Feed } from "@/types";
import { apiUrl } from "./config";
import { omit } from "../../utils";

describe("feed lifecycle tests", () => {
  beforeAll(async () => {
    // Get all feeds
    const allFeedsResult = await fetch(`${apiUrl}/feeds`);

    const { data: allFeeds } = await allFeedsResult.json();

    // Delete all feeds
    await Promise.all(
      allFeeds.map(async (feed: Feed) => {
        const result = await fetch(`${apiUrl}/feeds/${feed.id}`, {
          method: "DELETE",
        });

        const { data, message } = await result.json();

        expect(message).toBe("Feed deleted");
        expect(data.id).toBe(feed.id);
      }),
    );
  });

  let feedId: string;
  const nameAfterUpdate = "Updated name";

  test("should be able to add a new feed", async () => {
    const result = await fetch(`${apiUrl}/feeds`, {
      method: "POST",
      body: JSON.stringify(testFeeds[0]),
    });

    const { data, message } = await result.json();

    feedId = data.id;
    expect(message).toBe("Feed added");
    expect(omit(data, ["id"])).toEqual(omit(testFeeds[0], ["id"]));
  });

  test("should be able to update a feed", async () => {
    const result = await fetch(`${apiUrl}/feeds/${feedId}`, {
      method: "PATCH",
      body: JSON.stringify({
        ...testFeeds[0],
        name: nameAfterUpdate,
      }),
    });

    const { data, message } = await result.json();

    expect(message).toBe("Feed updated");

    expect(data.id).toBe(feedId);

    testFeeds[0].name = nameAfterUpdate;
  });

  test("should be able to get a feed", async () => {
    const result = await fetch(`${apiUrl}/feeds/${feedId}`);

    const { data, message } = await result.json();

    expect(message).toBe("Feed retrieved");
    expect(omit(data, ["id"])).toEqual(omit(testFeeds[0], ["id"]));
  });

  test("should be able to add a second feed", async () => {
    const result = await fetch(`${apiUrl}/feeds`, {
      method: "POST",
      body: JSON.stringify(testFeeds[1]),
    });

    const { data, message } = await result.json();

    expect(message).toBe("Feed added");
    expect(omit(data, ["id"])).toEqual(omit(testFeeds[1], ["id"]));
  });

  test("should be able to get all feeds", async () => {
    const result = await fetch(`${apiUrl}/feeds`);

    const { data, message } = await result.json();

    expect(message).toBe("Feeds retrieved");

    expect(data.map((feed: Feed) => omit(feed, ["id"]))).toEqual(
      testFeeds.map((feed: Feed) => omit(feed, ["id"])),
    );
  });

  test("should be able to delete a feed", async () => {
    const result = await fetch(`${apiUrl}/feeds/${feedId}`, {
      method: "DELETE",
    });

    const { data, message } = await result.json();

    expect(message).toBe("Feed deleted");
    expect(data.id).toBe(feedId);
  });

  test("should be able to get all feeds after delete", async () => {
    const result = await fetch(`${apiUrl}/feeds`);

    const { data, message } = await result.json();

    expect(message).toBe("Feeds retrieved");

    expect(data.map((feed: Feed) => omit(feed, ["id"]))).toEqual([
      omit(testFeeds[1], ["id"]),
    ]);
  });

  test("should not be able to get a deleted feed", async () => {
    const result = await fetch(`${apiUrl}/feeds/${feedId}`);

    const {
      error: { name },
    } = await result.json();

    expect(name).toBe("NotFoundError");
  });

  test("should not be able to update a deleted feed", async () => {
    const result = await fetch(`${apiUrl}/feeds/${feedId}`, {
      method: "PATCH",
      body: JSON.stringify({
        ...testFeeds[0],
        name: nameAfterUpdate,
      }),
    });

    const {
      error: { name },
    } = await result.json();

    expect(name).toBe("NotFoundError");
  });

  test("should not be able to delete a deleted feed", async () => {
    const result = await fetch(`${apiUrl}/feeds/${feedId}`, {
      method: "DELETE",
    });

    const {
      error: { name },
    } = await result.json();

    expect(name).toBe("NotFoundError");
  });

  test("should be able to delete a second feed", async () => {
    const result = await fetch(`${apiUrl}/feeds/${testFeeds[1].id}`, {
      method: "DELETE",
    });

    const { data, message } = await result.json();

    expect(message).toBe("Feed deleted");
    expect(data.id).toBe(testFeeds[1].id);
  });

  test("should return an empty array when getting all feeds after delete", async () => {
    const result = await fetch(`${apiUrl}/feeds`);

    const { data, message } = await result.json();

    expect(message).toBe("Feeds retrieved");

    expect(data).toEqual([]);
  });
});
