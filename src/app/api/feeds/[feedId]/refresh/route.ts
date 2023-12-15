import { ArticlesController } from "@/app/api/controllers/articles";
import { createHandlerForController } from "@/app/api/createHandler";
import { toNextEndpoint } from "@/app/api/next";

/**
 * Refresh all articles for a feed
 */
export const POST = toNextEndpoint(
  createHandlerForController(ArticlesController),
);
