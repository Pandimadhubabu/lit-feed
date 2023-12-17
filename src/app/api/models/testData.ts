import { Article, Feed, User } from "@/types";
import { OauthClaims } from "../types";

export const testUser: User = {
  email: "test@example.com",
  name: "Test User",
  picture: "https://example.com/test.jpg",
  id: "245f23984f233d32b233f2f2",
  oauthId: "OAUTH_ID",
  isEmailVerified: true,
  nickname: "test",
  updatedAt: "2020-01-01T00:00:00.000Z",
};

export const testClaims: OauthClaims = {
  email: testUser.email,
  email_verified: "true",
  name: testUser.name,
  nickname: testUser.nickname,
  picture: testUser.picture,
  sid: "SESSION_ID",
  sub: testUser.oauthId,
  updated_at: testUser.updatedAt,
};

export const testFeeds: Feed[] = [
  {
    href: "https://www.reddit.com/r/programming/.rss",
    userId: testUser.id,
    id: "6520691d42b827145292f2f1",
    name: "programming",
    updatedAt: "2020-01-01T00:00:00.000Z",
    unread: 0,
  },
  {
    href: "https://www.reddit.com/r/javascript/.rss",
    userId: testUser.id,
    id: "6520691d42b827145292f2f2",
    name: "javascript",
    updatedAt: "2020-01-01T00:00:00.000Z",
    unread: 0,
  },
  {
    id: "656328861718a48afe45bf70",
    name: "Stackoverflow Blog",
    href: "stackoverflow.com",
    unread: 1,
    updatedAt: "2020-01-01T00:00:00.000Z",
    userId: testUser.id,
  },
  {
    id: "656328961718a48afe45bf71",
    name: "Hacker News",
    updatedAt: "2020-01-01T00:00:00.000Z",
    href: "https://hnrss.org/newest",
    unread: 0,
    userId: testUser.id,
  },
  {
    id: "656328a61718a48afe45bf72",
    name: "Martin Fowler",
    href: "martinfowler.com",
    unread: 0,
    userId: testUser.id,
    updatedAt: "2020-01-01T00:00:00.000Z",
  },
];

export const testArticles: Article[] = [
  {
    title: "Can LLMs learn from a single example?",
    summary: `I've been working on a new approach to few-shot learning, and I'm excited to share some results.`,
    href: "https://www.fast.ai/posts/2023-09-04-learning-jumps/",
    feedName: "Hacker News",
    duration: "1h",
    date: "Wed, 6 Sep 2023 00:40:05 +0000",
    id: "2452691d42b827145292f2f2",
    feedId: testFeeds[0].id,
    isRead: false,
    isSaved: false,
  },
  {
    title: "Fine-grained caching strategies of dynamic queries",
    summary: `Today I would like to talk about caching strategies for aggregate queries over time-based data which is updated often`,
    href: "https://jensrantil.github.io/posts/fast-aggregate-queries-on-dynamic-data",
    feedName: "Hacker News",
    duration: "1h",
    date: "Wed, 20 Sep 2023 17:42:24 +0000",
    id: "2452691d42b827145292f2f3",
    feedId: testFeeds[0].id,
    isRead: true,
    isSaved: false,
  },
];
