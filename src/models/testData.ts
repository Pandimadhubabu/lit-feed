import { Article, Feed } from "@/types";

export const testFeeds: Feed[] = [
  {
    href: "https://www.reddit.com/r/programming/.rss",
    id: "1",
    name: "programming",
    unread: 0,
  },
  {
    href: "https://www.reddit.com/r/javascript/.rss",
    id: "2",
    name: "javascript",
    unread: 0,
  },
];

export const testArticles: Article[] = [
  {
    feedId: "1",
    id: "1",
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
    feedId: "2",
    id: "2",
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
