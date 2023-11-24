import { Article, Feed } from "@/types";

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
