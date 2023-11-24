import * as feedModels from "@/models/feeds";
import { Feed } from "@/types";

export async function getFeed({
  params: { id },
}: {
  params: { id: Feed["id"] };
}) {
  const data = await feedModels.getFeed(id);

  return {
    status: 200,
    data,
    message: "Feed retrieved",
  };
}
