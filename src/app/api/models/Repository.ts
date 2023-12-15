import { User } from "@/types";

export class Repository<T> {
  constructor(protected user: User) {}

  async get(request: HandlerRequest): Promise<T> {
    return {} as T;
  }

  async getAll(request: HandlerRequest): Promise<T[]> {
    return [] as T[];
  }

  async create(request: HandlerRequest): Promise<T> {
    return {} as T;
  }

  async delete(request: HandlerRequest): Promise<{ id: string }> {
    return { id: "" };
  }

  async update(request: HandlerRequest): Promise<{ id: string }> {
    return { id: "" };
  }

  async execute(request: HandlerRequest): Promise<void> {}
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
