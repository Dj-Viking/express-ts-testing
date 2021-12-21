import { signToken } from "../utils/signToken";
import { verifyTokenAsync } from "../utils/verifyTokenAsync";
import {
  SignLoginRegisterMeTokenArgs,
  SignResetPasswordTokenArgs,
  IJwtData,
  AdminTokenArgs,
} from "../types";
// eslint-disable-next-line
const uuid = require("uuid");

describe("test the sign token branches", () => {
  test("the token signs with the correct args for login/signup token", async () => {
    const theUuid = uuid.v4() as string;
    const token = signToken({
      username: "username",
      email: "email",
      uuid: theUuid,
      _id: "someid",
      role: "user",
    } as SignLoginRegisterMeTokenArgs);
    expect(typeof token).toBe("string");
    const verified: IJwtData | Error | null = (await verifyTokenAsync(
      token
    )) as IJwtData;
    expect(verified instanceof Error).toBe(false);
    expect(verified.email).toBe("email");
    expect(verified.username).toBe("username");
    expect(verified.uuid).toBe(theUuid);
    expect(verified.role).toBe("user");
    expect(verified._id).toBe("someid");
  });
  test("the token signs with correct args for reset password token", async () => {
    const theUuid = uuid.v4() as string;
    const token = signToken({
      resetEmail: "reset email",
      uuid: theUuid,
      exp: "5m",
    } as SignResetPasswordTokenArgs);
    expect(typeof token).toBe("string");
    const verified: IJwtData | Error | null = (await verifyTokenAsync(
      token
    )) as IJwtData;
    expect(verified.resetEmail).toBe("reset email");
    expect(verified.uuid).toBe(theUuid);
  });
  test("the token signing returns an error string as the token", async () => {
    //@ts-expect-error just for testing that the token could not be signed without an arguments
    const token = signToken({});
    expect(typeof token).toBe("string");
    const verified: IJwtData | Error | null = (await verifyTokenAsync(
      token
    )) as Error;
    expect(verified instanceof Error).toBe(true);
  });
  test("the token returned has the admin role", async () => {
    const adminUuid = uuid.v4();
    const token = signToken({
      adminUuid,
    } as AdminTokenArgs);
    expect(typeof token).toBe("string");
    const verified: IJwtData | Error | null = (await verifyTokenAsync(
      token
    )) as IJwtData;
    expect(verified instanceof Error).toBe(false);
    expect(verified.adminUuid).toBe(adminUuid);
    expect(verified.role).toBe("admin");
  });
});
