import * as feedModels from "@/app/api/models/feeds";

export async function getFeeds() {
  const feeds = await feedModels.getFeeds();

  return {
    message: "Feeds retrieved",
    status: 200,
    data: feeds,
  };
}
