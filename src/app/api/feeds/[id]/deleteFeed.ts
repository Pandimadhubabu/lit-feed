import * as feedModels from "@/models/feeds";
import { Feed } from "@/types";

export async function deleteFeed({
  params: { id },
}: {
  params: { id: Feed["id"] };
}) {
  const deletedFeed = await feedModels.deleteFeed(id);

  return {
    data: deletedFeed,
    status: 200,
    message: "Feed deleted",
  };
}
