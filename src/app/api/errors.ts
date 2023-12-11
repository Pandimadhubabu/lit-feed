import { ErrorData } from "./types";

export class GenericError extends Error {
  status: number;
  data?: ErrorData;
  name: string;
  constructor(message: string, data?: ErrorData) {
    super(message);
    this.name = "GenericError";
    this.status = 500;
    this.data = data;
  }
}

export class NotFoundError extends GenericError {
  status: number;
  name: string;
  constructor(message: string, data?: ErrorData) {
    super(message, data);
    this.name = "NotFoundError";
    this.status = 404;
  }
}

export class UnauthorizedError extends GenericError {
  status: number;
  name: string;
  constructor(message: string, data?: ErrorData) {
    super(message, data);
    this.name = "UnauthorizedError";
    this.status = 401;
  }
}

export class ServerError extends GenericError {
  status: number;
  name: string;
  constructor(message: string, data?: ErrorData) {
    super(message, data);
    this.name = "ServerError";
    this.status = 500;
  }
}
