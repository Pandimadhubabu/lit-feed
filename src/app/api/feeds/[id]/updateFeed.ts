import * as feedModels from "@/models/feeds";
import { Feed } from "@/types";

export async function updateFeed({
  body,
  params: { id },
}: {
  body: Feed;
  params: { id: Feed["id"] };
}) {
  const updatedFeed = await feedModels.updateFeed(body, id);

  return {
    data: updatedFeed,
    status: 200,
    message: "Feed updated",
  };
}
