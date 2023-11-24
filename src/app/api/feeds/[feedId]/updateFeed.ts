import * as feedModels from "@/models/feeds";
import { Feed } from "@/types";

export async function updateFeed({
  body,
  params: { feedId },
}: {
  body: Feed;
  params: { feedId: Feed["id"] };
}) {
  const data = await feedModels.updateFeed(body, feedId);

  return {
    status: 200,
    data,
    message: "Feed updated",
  };
}
