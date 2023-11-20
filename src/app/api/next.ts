import { NextRequest, NextResponse } from "next/server";
import { logError } from "./logger";
import { GenericError } from "./errors";
import { HttpResponse } from "./types";

export type NextRequestWithParams = {
  body?: Record<string, unknown>;
  query?: Record<string, unknown>;
  params?: Record<string, unknown>;
};
export function withParams(
  fn: (request: NextRequestWithParams) => Promise<NextResponse>,
) {
  return async (
    request: NextRequest,
    { params }: { params: NextRequestWithParams["params"] },
  ) => {
    const queryParams = paramsToObject(request.nextUrl.searchParams);
    return fn({
      body: await parseBody(request),
      query: Object.keys(queryParams).length > 0 ? queryParams : undefined,
      params,
    });
  };
}

export async function toNextResponse<T extends (request: any) => HttpResponse>(
  request: NextRequestWithParams,
  fn: T,
) {
  let response: HttpResponse;
  try {
    response = await fn(request);
  } catch (error: unknown) {
    if (error instanceof GenericError) {
      return NextResponse.json(
        {
          error: {
            message: error.message,
            data: error.data,
          },
        },
        {
          status: error.status,
        },
      );
    }

    logError({ error }, "Error while handling request");
    return NextResponse.json(
      {
        error,
      },
      {
        status: 500,
      },
    );
  }
  const { data, message, status } = response;

  return NextResponse.json(
    {
      message,
      data,
    },
    {
      status,
    },
  );
}

// TODO: Add request validation
export function toNextEndpoint<T extends (request: any) => any>(fn: T) {
  return withParams(async (request: NextRequestWithParams) =>
    toNextResponse(request, fn),
  );
}

export function paramsToObject(params: NextRequest["nextUrl"]["searchParams"]) {
  const result: Record<string, unknown> = {};
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  return result;
}

// TODO: Add response validation
// TODO: Distinguish between malformed JSON and no body
export async function parseBody(request: NextRequest) {
  try {
    return await request.json();
  } catch {
    return undefined;
  }
}
