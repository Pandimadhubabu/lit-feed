import { NextRequest, NextResponse } from "next/server";
import * as logger from "./logger";
import { GenericError, UnauthorizedError } from "./errors";
import { HttpResponse, NextRequestWithParams, OauthClaims } from "./types";
import { getSession } from "@auth0/nextjs-auth0";
import { User } from "@/types";
import { getOrCreateUser } from "./models/users";
const localhostClaims: OauthClaims = {
  email: "fake@example.com",
  name: "Fake User",
  email_verified: "true",
  nickname: "fakeuser",
  picture: "https://example.com",
  sub: "fakeuser",
  sid: "fakeuser",
  updated_at: Date.now().toString(),
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
      url: request.url,
    });
  };
}

export async function toNextResponse<
  T extends (request: any, user: User) => HttpResponse,
>(request: NextRequestWithParams, fn: T) {
  const claims = await getClaims(request);
  const user = await getUserByClaims(claims);

  let response: HttpResponse;
  try {
    response = await fn(request, user);
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
export async function getClaims(
  request: NextRequestWithParams,
): Promise<OauthClaims> {
  const { url } = request;

  if (url?.match(/:\/\/localhost/)) {
    // Return a fake user for local development
    return localhostClaims;
  }

  const session = await getSession();

  if (!session) {
    throw new UnauthorizedError("User is not logged in");
  }

  return session.user as OauthClaims;
}

export async function getUserByClaims(claims: OauthClaims): Promise<User> {
  if (claims.sub === localhostClaims.sub) {
    // Return a fake user for local development
    return {
      id: "fakeuser",
      email: localhostClaims.email,
      isEmailVerified: localhostClaims.email_verified === "true",
      updatedAt: new Date(localhostClaims.updated_at),
      name: localhostClaims.name,
      nickname: localhostClaims.nickname,
      picture: localhostClaims.picture,
      oauthId: localhostClaims.sub,
    };
  }
  return await getOrCreateUser(claims);
}
