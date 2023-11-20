import { toNextEndpoint } from "../next";
import { addNewFeed } from "./addNewFeed";
import { getFeeds } from "./getFeeds";

/**
 * Returns a list of all feed sources
 * @param body Unused
 * @returns A list of all feed sources
 */
export const GET = toNextEndpoint(getFeeds);

/**
 * Adds a new feed
 * @param body The feed to add
 * @returns The added feed
 */
export const POST = toNextEndpoint(addNewFeed);
