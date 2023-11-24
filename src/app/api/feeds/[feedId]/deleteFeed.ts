import * as feedModels from "@/models/feeds";
import { Feed } from "@/types";

export async function deleteFeed({
  params: { feedId },
}: {
  params: { feedId: Feed["id"] };
}) {
  const data = await feedModels.deleteFeed(feedId);

  return {
    status: 200,
    data,
    message: "Feed deleted",
  };
}
