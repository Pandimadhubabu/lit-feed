import { createHandler } from "../createHandler";
import { Feeds } from "../models/feeds";
import { toNextEndpoint } from "../next";

/**
 * Returns a list of all feed sources
 * @param body Unused
 * @returns A list of all feed sources
 */
export const GET = toNextEndpoint(createHandler(Feeds, "get"));

/**
 * Adds a new feed
 * @param body The feed to add
 * @returns The added feed
 */
export const POST = toNextEndpoint(createHandler(Feeds, "create"));
