export type ErrorData = Record<string, unknown>;

export type HttpResponse = {
  status: number;
  message: string;
  data: unknown;
};
