import { Article, Feed, User } from "@/types";
import { OauthClaims } from "../types";

export const testFeeds: Feed[] = [
  {
    href: "https://www.reddit.com/r/programming/.rss",
    id: "6520691d42b827145292f2f1",
    name: "programming",
    unread: 0,
  },
  {
    href: "https://www.reddit.com/r/javascript/.rss",
    id: "6520691d42b827145292f2f2",
    name: "javascript",
    unread: 0,
  },
];

export const testArticles: Article[] = [
  {
    feedId: "6520691d42b827145292f2f1",
    id: "245f23984f233d32b233f2f1",
    title: "test",
    date: new Date().toISOString(),
    duration: "5 minutes",
    feedName: "programming",
    href: "https://www.reddit.com/r/programming/comments/1ykrzo/why_i_use_vim/",
    isRead: false,
    isSaved: false,
    summary: "test",
  },
  {
    feedId: "6520691d42b827145292f2f1",
    id: "245f23984f233d32b233f2f2",
    title: "test",
    date: new Date().toISOString(),
    duration: "5 minutes",
    feedName: "javascript",
    href: "https://www.reddit.com/r/javascript/comments/1ykrzo/why_i_use_vim/",
    isRead: false,
    isSaved: false,
    summary: "test",
  },
];

export const testUser: User = {
  email: "test@example.com",
  name: "Test User",
  picture: "https://example.com/test.jpg",
  id: "245f23984f234d32b233f2f2",
  oauthId: "OAUTH_ID",
  isEmailVerified: true,
  nickname: "test",
  updatedAt: new Date("2020-01-01T00:00:00.000Z"),
};

export const testClaims: OauthClaims = {
  email: testUser.email,
  email_verified: "true",
  name: testUser.name,
  nickname: testUser.nickname,
  picture: testUser.picture,
  sid: "SESSION_ID",
  sub: testUser.oauthId,
  updated_at: testUser.updatedAt.toISOString(),
};
