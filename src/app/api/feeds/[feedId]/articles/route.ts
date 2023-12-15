import { ArticlesController as ArticlesController } from "@/app/api/controllers/articles";
import {
  createHandler,
  createHandlerForController,
} from "@/app/api/createHandler";
import { Articles as ArticlesModel } from "@/app/api/models/articles";
import { toNextEndpoint } from "@/app/api/next";

/**
 * Get all articles for a feed
 * @param {string} feedId
 * @returns An array of articles
 */
export const GET = toNextEndpoint(createHandler(ArticlesModel, "getAll"));

/**
 * Refresh all articles for a feed
 */
export const POST = toNextEndpoint(
  createHandlerForController(ArticlesController),
);
