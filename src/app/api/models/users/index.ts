import * as logger from "@/app/api/logger";
import { NotFoundError } from "../../errors";
import { OauthClaims } from "../../types";
import { mongoToObject, users } from "../mongo";
import { User } from "@/types";

export async function getUser(user: Omit<User, "id">): Promise<User> {
  const usersCollection = await users();

  const mongoResult = await usersCollection.findOne({
    oauthId: user.oauthId,
  });

  logger.debug({ mongoResult }, "mongoResult");

  if (!mongoResult) {
    throw new NotFoundError("No user found", { user });
  }

  const userResult = mongoToObject<User>(mongoResult);

  logger.debug({ userResult }, "getUser result");

  return userResult;
}

export async function createUser(user: Omit<User, "id">): Promise<User> {
  const usersCollection = await users();

  const { insertedId } = await usersCollection.insertOne(user);

  logger.debug({ insertedId }, "mongoResult");

  const userResult = mongoToObject<User>({
    ...user,
    _id: insertedId,
  });

  logger.debug({ userResult }, "createUser result");

  return userResult;
}

export async function getOrCreateUser(claims: OauthClaims) {
  const userFromClaims = convertClaimsToUser(claims);

  try {
    return await getUser(userFromClaims);
  } catch (error: unknown) {
    if (error instanceof NotFoundError) {
      return await createUser(userFromClaims);
    }
    throw error;
  }
}

export function convertClaimsToUser(claims: OauthClaims): Omit<User, "id"> {
  return {
    email: claims.email,
    name: claims.name,
    isEmailVerified: claims.email_verified === "true",
    nickname: claims.nickname,
    picture: claims.picture,
    oauthId: claims.sub,
    updatedAt: new Date(claims.updated_at),
  };
}
