import { ErrorData } from "./types";

export class GenericError extends Error {
  status: number;
  data: ErrorData;
  name: string;
  constructor(message: string, data: ErrorData) {
    super(message);
    this.name = "GenericError";
    this.status = 500;
    this.data = data;
  }
}

export class NotFoundError extends Error {
  status: number;
  data: ErrorData;
  name: string;
  constructor(message: string, data: ErrorData) {
    super(message);
    this.name = "NotFoundError";
    this.status = 404;
    this.data = data;
  }
}
