import { createHandlerFromRepository } from "../../createHandler";
import { Feeds } from "../../models/feeds";
import { toNextEndpoint } from "../../next";

/**
 * Gets a feed by ID
 * @returns The feed
 */
export const GET = toNextEndpoint(createHandlerFromRepository(Feeds, "get"));

/**
 * Deletes a feed by ID
 * @returns The ID of the deleted feed
 */
export const DELETE = toNextEndpoint(
  createHandlerFromRepository(Feeds, "delete"),
);

/**
 * Updates a feed by ID
 * @param body The feed to update
 * @returns The ID of the updated feed
 */
export const PATCH = toNextEndpoint(
  createHandlerFromRepository(Feeds, "update"),
);
