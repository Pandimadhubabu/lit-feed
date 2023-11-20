import { getFeeds as getFeedsModel } from "@/models/feeds";

export async function getFeeds() {
  const feeds = await getFeedsModel();

  return {
    data: feeds,
    status: 200,
  };
}
