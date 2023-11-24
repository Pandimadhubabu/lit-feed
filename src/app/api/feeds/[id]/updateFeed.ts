import * as feedModels from "@/models/feeds";
import { Feed } from "@/types";

export async function updateFeed({
  body,
  params: { id },
}: {
  body: Feed;
  params: { id: Feed["id"] };
}) {
  const data = await feedModels.updateFeed(body, id);

  return {
    status: 200,
    data,
    message: "Feed updated",
  };
}
