const MockedNextRequest = jest.fn();

import { NextRequest, NextResponse } from "next/server";
import { testClaims } from "./models/testData";
import { NextRequestWithParams } from "./types";
import { toNextEndpoint, toNextResponse, withParams } from "./next";

jest.mock("./mongoConfig", () => ({
  mongoUrl: "mongodb://localhost:27017",
}));

jest.mock("next/server", () => {
  const NextServer = jest.requireActual("next/server");
  return {
    ...NextServer,
    NextRequest: MockedNextRequest,
  };
});

describe("next.ts tests", () => {
  beforeAll(() => {
    MockedNextRequest.mockImplementation(() => ({
      nextUrl: {
        searchParams: new URLSearchParams(),
      },
      url: "http://localhost",
    }));
  });
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
        url: "http://localhost",
      },
      fn,
    );
    const response = await nextHandler;
    const { data } = await response.json();
    expect(data).toEqual("OK");
  });

  test("toNextEndpoint should return a function that takes a NextRequest, and a params object and returns a NextResponse", async () => {
    const fn = jest.fn().mockResolvedValue({ data: "OK", status: 200 });
    const nextHandler = toNextEndpoint(fn);
    const response = await nextHandler(new NextRequest("http://localhost"), {
      params: {},
    });

    const { data } = await response.json();
    expect(data).toEqual("OK");
  });

  test("accessing any URL other than localhost should throw an error", async () => {
    MockedNextRequest.mockImplementation(() => ({
      nextUrl: {
        searchParams: new URLSearchParams(),
      },
      url: "http://example.com",
    }));
    const fn = jest.fn().mockResolvedValue({ data: "OK", status: 200 });
    const nextHandler = toNextEndpoint(fn);
    expect(
      nextHandler(new NextRequest("http://example.com"), {
        params: {},
      }),
    ).rejects.toThrow("Something went wrong");
  });
});
