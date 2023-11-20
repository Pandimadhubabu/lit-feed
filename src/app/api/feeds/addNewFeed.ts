import { addFeed } from "@/models/feeds";
import { Feed } from "@/types";

export async function addNewFeed({ body }: { body: Feed }) {
  const newFeed = await addFeed(body);

  return {
    data: newFeed,
    status: 200,
  };
}
