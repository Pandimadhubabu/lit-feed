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
  url?: string;
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
