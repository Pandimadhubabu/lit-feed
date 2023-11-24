import * as feedModels from "@/models/feeds";
import { Feed } from "@/types";

export async function deleteFeed({
  params: { id },
}: {
  params: { id: Feed["id"] };
}) {
  const data = await feedModels.deleteFeed(id);

  return {
    status: 200,
    data,
    message: "Feed deleted",
  };
}
