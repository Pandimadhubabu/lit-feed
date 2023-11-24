import { toNextEndpoint } from "../../next";
import { deleteFeed } from "./deleteFeed";
import { getFeed } from "./getFeed";
import { updateFeed } from "./updateFeed";

/**
 * Gets a feed by ID
 * @returns The feed
 */
export const GET = toNextEndpoint(getFeed);

/**
 * Deletes a feed by ID
 * @returns The ID of the deleted feed
 */
export const DELETE = toNextEndpoint(deleteFeed);

/**
 * Updates a feed by ID
 * @param body The feed to update
 * @returns The ID of the updated feed
 */
export const PATCH = toNextEndpoint(updateFeed);
