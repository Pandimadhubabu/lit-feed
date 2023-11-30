import { NextRequest, NextResponse } from "next/server";
import { toNextEndpoint, toNextResponse, withParams } from "./next";
import { NextRequestWithParams } from "./types";

jest.mock("@auth0/nextjs-auth0", () => ({
  getSession: jest.fn().mockResolvedValue({
    user: {
      email: "test@example.com",
      name: "Test User",
      picture: "https://example.com/test.jpg",
      id: "245f23984f234d32b233f2f2",
      oauthId: "OAUTH_ID",
      isEmailVerified: true,
      nickname: "test",
      updatedAt: "2020-01-01T00:00:00.000Z",
    },
  }),
}));

jest.mock("next/server", () => {
  const NextResponse = jest.fn();
  (NextResponse as any).json = jest
    .fn()
    .mockReturnValue(new NextResponse("OK"));
  return {
    NextRequest: jest.fn().mockImplementation(() => ({
      nextUrl: {
        searchParams: new URLSearchParams(),
      },
    })),
    NextResponse,
  };
});

describe("next.ts tests", () => {
  test("withParams should return a function", () => {
    const fn = jest.fn().mockResolvedValue(new NextResponse("OK"));
    const result = withParams(fn);
    expect(typeof result).toBe("function");
  });

  test("withParams should call the passed function with the correct parameters", async () => {
    const fn = jest.fn().mockResolvedValue(new NextResponse("OK"));
    const handler = withParams(fn);
    const request = new NextRequest("http://localhost");
    const params: NextRequestWithParams["params"] = { key: "value" };
    await handler(request, { params });
    expect(fn).toHaveBeenCalledWith({
      body: undefined,
      query: undefined,
      params,
    });
  });

  test("toNextResponse should return a NextResponse", async () => {
    const fn = jest.fn().mockResolvedValue({ data: "OK", status: 200 });
    const nextHandler = toNextResponse(
      {
        body: undefined,
        query: undefined,
        params: {},
      },
      fn,
    );
    expect(nextHandler).resolves.toEqual(new NextResponse("OK"));
  });

  test("toNextEndpoint should return a function that takes a NextRequest, and a params object and returns a NextResponse", async () => {
    const fn = jest.fn().mockResolvedValue({ data: "OK", status: 200 });
    const nextHandler = toNextEndpoint(fn);
    const response = await nextHandler(new NextRequest("http://localhost"), {
      params: {},
    });
    expect(response).toEqual(new NextResponse("OK"));
  });
});
