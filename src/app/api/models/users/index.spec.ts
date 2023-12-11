import { ObjectId } from "mongodb";
import { testClaims, testUser } from "../testData";
import { getUser, createUser, convertClaimsToUser } from ".";

jest.mock("../../mongoConfig", () => ({
  mongoUrl: "mongodb://localhost:27017",
}));

jest.mock("../mongo", () => {
  const originalModule = jest.requireActual("../mongo");
  return {
    ...originalModule,
    users: jest.fn().mockResolvedValue({
      findOne: jest.fn().mockResolvedValue({
        ...testUser,
        _id: new ObjectId(testUser.id),
      }),
      insertOne: jest
        .fn()
        .mockResolvedValue({ insertedId: new ObjectId(testUser.id) }),
    }),
  };
});

describe("Users model tests", () => {
  const userFromClaims = convertClaimsToUser(testClaims);
  test("getUser should return an array", async () => {
    const foundUser = await getUser(userFromClaims);
    expect(foundUser).toEqual(testUser);
  });
  test("createUser should return an object with insertedId", async () => {
    const addedUser = await createUser(userFromClaims);
    expect(addedUser).toEqual(testUser);
  });
});
