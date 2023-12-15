import { createHandlerFromRepository } from "@/app/api/createHandler";
import { Articles } from "@/app/api/models/articles";
import { toNextEndpoint } from "@/app/api/next";

/**
 * Get an article by Id
 * @param {string} feedId
 * @param {string} articleId
 * @returns An article
 */
export const GET = toNextEndpoint(createHandlerFromRepository(Articles, "get"));

/**
 * Updates an article by Id
 * @param {string} feedId
 * @param {string} articleId
 * @returns The ID of the updated article
 */
export const PATCH = toNextEndpoint(
  createHandlerFromRepository(Articles, "update"),
);

/**
 * Deletes an article by Id
 * @param {string} feedId
 * @param {string} articleId
 * @returns The ID of the deleted article
 */
export const DELETE = toNextEndpoint(
  createHandlerFromRepository(Articles, "delete"),
);
