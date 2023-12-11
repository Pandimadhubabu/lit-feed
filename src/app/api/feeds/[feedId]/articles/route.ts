import { createHandler } from "@/app/api/createHandler";
import { Articles } from "@/app/api/models/articles";
import { toNextEndpoint } from "@/app/api/next";

/**
 * Get all articles for a feed
 * @param {string} feedId
 * @returns An array of articles
 */
export const GET = toNextEndpoint(createHandler(Articles, "get"));
