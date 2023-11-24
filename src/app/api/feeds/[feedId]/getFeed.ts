import * as feedModels from "@/models/feeds";
import { Feed } from "@/types";

export async function getFeed({
  params: { feedId },
}: {
  params: { feedId: Feed["id"] };
}) {
  const data = await feedModels.getFeed(feedId);

  return {
    status: 200,
    data,
    message: "Feed retrieved",
  };
}
