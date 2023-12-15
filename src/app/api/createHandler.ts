import { UnauthorizedError } from "./errors";
import { Repository, createRepository } from "./models/Repository";
import { NextRequestWithParams } from "./types";

type MethodToDataType<U> = {
  get: U;
  getAll: U[];
  create: U;
  delete: { id: string };
  update: { id: string };
};

type MethodReturnType<
  R,
  M extends "get" | "getAll" | "create" | "delete" | "update",
> = R extends typeof Repository<infer U> ? MethodToDataType<U>[M] : never;

export function createHandlerFromRepository<
  R extends typeof Repository<unknown>,
  M extends "get" | "getAll" | "create" | "delete" | "update",
>(
  // class type of Repository
  RepositoryClass: R,
  method: M,
) {
  return async (request: NextRequestWithParams) => {
    const { user } = request;
    if (!user) {
      throw new UnauthorizedError("Unauthorized");
    }
    const repository = createRepository(RepositoryClass, user);
    const data = (await repository[method](request)) as MethodReturnType<R, M>;

    return {
      status: 200,
      data,
      message: `Performed ${method} on ${RepositoryClass.name} successfully`,
      // infer data type from the method used on the repository
    } as const;
  };
}
