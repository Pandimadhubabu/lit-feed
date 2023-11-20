import { deleteFeed, updateFeed } from "@/models/feeds";
import { toNextEndpoint } from "../../next";

/**
 * Deletes a feed by ID
 * @returns The deleted feed
 */
export const DELETE = toNextEndpoint(({ params: { id } }) => deleteFeed(id));

/**
 * Updates a feed by ID
 * @param body The feed to update
 * @returns The updated feed
 */
export const PATCH = toNextEndpoint(({ body, params: { id } }) =>
  updateFeed(body, id),
);
