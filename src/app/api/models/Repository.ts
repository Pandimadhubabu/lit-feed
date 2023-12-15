import { User } from "@/types";

export class Repository<T> {
  constructor(protected user: User) {}

  async get(request: HandlerRequest): Promise<T> {
    throw new Error("Not implemented");
  }

  async getAll(request: HandlerRequest): Promise<T[]> {
    throw new Error("Not implemented");
  }

  async create(request: HandlerRequest): Promise<T> {
    throw new Error("Not implemented");
  }

  async delete(request: HandlerRequest): Promise<{ id: string }> {
    throw new Error("Not implemented");
  }

  async update(request: HandlerRequest): Promise<{ id: string }> {
    throw new Error("Not implemented");
  }

  async execute(request: HandlerRequest): Promise<void> {
    throw new Error("Not implemented");
  }
}

const repositories: {
  [key: string]: { [userId: string]: Repository<unknown> };
} = {};
export function createRepository<T extends typeof Repository<unknown>>(
  RepoClass: T,
  user: User,
): InstanceType<T> {
  if (!repositories[RepoClass.name]) {
    repositories[RepoClass.name] = {
      [user.id]: new RepoClass(user),
    };
  }
  if (!repositories[RepoClass.name][user.id]) {
    repositories[RepoClass.name][user.id] = new RepoClass(user);
  }

  return repositories[RepoClass.name][user.id] as InstanceType<T>;
}

export type HandlerRequest = { params?: any; body?: any; query?: any };
