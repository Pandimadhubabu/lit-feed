import * as feedModels from "@/app/api/models/feeds";
import { Feed } from "@/types";

export async function addFeed({ body }: { body: Feed }) {
  const newFeed = await feedModels.addFeed(body);

  return {
    data: newFeed,
    status: 201,
    message: "Feed added",
  };
}
