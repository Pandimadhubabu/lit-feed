import { NextRequest, NextResponse } from "next/server";
import * as logger from "./logger";
import { GenericError } from "./errors";
import { HttpResponse, NextRequestWithParams, OauthClaims } from "./types";
import { getSession } from "@auth0/nextjs-auth0";

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

export async function toNextResponse<
  T extends (request: any, oauthClaims: OauthClaims) => HttpResponse,
>(request: NextRequestWithParams, fn: T) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json(
      {
        error: {
          message: "Unauthorized",
        },
      },
      {
        status: 401,
      },
    );
  }
  let response: HttpResponse;
  try {
    response = await fn(request, session.user as OauthClaims);
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

    logger.error({ error }, "Error while handling request");
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
