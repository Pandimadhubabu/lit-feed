import { Identifiable } from "@/types";

export type ErrorData = Record<string, unknown>;

export type HttpResponse = {
  status: 200 | 201 | 204 | 400 | 401 | 403 | 404 | 500;
  message: string;
  data?: unknown;
};

export type NextRequestWithParams = {
  body?: Record<string, unknown>;
  query?: Record<string, unknown>;
  params?: Record<string, unknown>;
};

export interface OauthClaims {
  nickname: string;
  name: string;
  picture: string;
  updated_at: string;
  email: string;
  email_verified: string;
  sub: string;
  sid: string;
}

export interface User extends Identifiable {
  id: string;
  email: string;
  name: string;
  picture: string;
  oauthId: string;
  isEmailVerified: boolean;
  nickname: string;
  updatedAt: string;
}
