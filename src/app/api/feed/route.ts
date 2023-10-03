import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

if (!process.env.MONGO_URL) {
  throw new Error(
    "Please define the MONGO_URL environment variable inside .env.local",
  );
}

const client = new MongoClient(process.env.MONGO_URL);

/**
 * Returns a list of all feed sources
 * @param request Ignored
 * @returns A list of all feed sources
 */
export async function GET(request: NextRequest) {
  await client.connect();
  const database = client.db("feed");
  const collection = database.collection("sources");
  const sources = await collection.find().toArray();
  if (sources.length === 0) {
    return NextResponse.json(
      {
        error: "No sources found",
      },
      {
        status: 404,
      },
    );
  }
  return NextResponse.json(
    {
      sources,
    },
    {
      status: 200,
    },
  );
}
