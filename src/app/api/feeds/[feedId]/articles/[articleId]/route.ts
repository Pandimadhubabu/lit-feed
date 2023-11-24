import { toNextEndpoint } from "@/app/api/next";
import { getArticle } from "./getArticle";
import { updateArticle } from "./updateArticle";
import { deleteArticle } from "./deleteArticle";

/**
 * Get an article by Id
 * @param {string} feedId
 * @param {string} articleId
 * @returns An article
 */
export const GET = toNextEndpoint(getArticle);

/**
 * Updates an article by Id
 * @param {string} feedId
 * @param {string} articleId
 * @returns The ID of the updated article
 */
export const PATCH = toNextEndpoint(updateArticle);

/**
 * Deletes an article by Id
 * @param {string} feedId
 * @param {string} articleId
 * @returns The ID of the deleted article
 */
export const DELETE = toNextEndpoint(deleteArticle);
