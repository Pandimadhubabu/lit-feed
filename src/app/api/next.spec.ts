import { NextRequest, NextResponse } from "next/server";
import { testClaims } from "./models/testData";
import { NextRequestWithParams } from "./types";
import { toNextEndpoint, toNextResponse, withParams } from "./next";

jest.mock("./mongoConfig", () => ({
  mongoUrl: "mongodb://localhost:27017",
}));

jest.mock("@auth0/nextjs-auth0", () => ({
  getSession: jest.fn().mockResolvedValue({
    // Yeah, it is confusing because auth0 calls it user and claims interchangeably
    user: testClaims,
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
      url: "http://localhost",
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
      url: "http://localhost",
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
