import { testFeeds } from "@/models/testData";
import { Feed } from "@/types";
import { apiUrl } from "./config";
import { omit } from "../../utils";

describe("feed lifecycle tests", () => {
  let feedId: string;
  let updatedFeed: Feed;

  test("should be able to add a new feed", async () => {
    const result = await fetch(`${apiUrl}/feeds`, {
      method: "POST",
      body: JSON.stringify(testFeeds[0]),
    });

    const { data, message } = await result.json();

    expect(message).toBe("Feed added");
    expect(omit(data, ["id"])).toEqual(omit(testFeeds[0], ["id"]));
  });

  test("should be able to update a feed", () => {});
});
