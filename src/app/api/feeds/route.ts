import { getFeeds } from "@/models/feeds";
import { Feed } from "@/types";
import { NextRequest, NextResponse } from "next/server";

/**
 * Returns a list of all feed sources
 * @param request Ignored
 * @returns A list of all feed sources
 */
export async function GET(request: NextRequest) {
  const feeds = await getFeeds();
  return NextResponse.json(
    {
      feeds,
    },
    {
      status: 200,
    },
  );
}
