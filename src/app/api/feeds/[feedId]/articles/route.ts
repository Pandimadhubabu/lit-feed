import { toNextEndpoint } from "@/app/api/next";
import { getArticles } from "./getArticles";

/**
 * Get all articles for a feed
 * @param {string} feedId
 * @returns An array of articles
 */
export const GET = toNextEndpoint(getArticles);
