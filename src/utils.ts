import Logger from "pino";
import { Feed } from "./types";
export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function getFeedLink(feed: Feed) {
  return `/feeds/${feed.id}`;
}

export const logger = Logger();
