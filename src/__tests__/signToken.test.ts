import { IJwtData } from "types";
import { signToken } from "../utils/signToken";
import { verifyTokenAsync } from "../utils/verifyTokenAsync";
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
    });
    expect(typeof token).toBe("string");
    let verified: IJwtData | Error | null = (await verifyTokenAsync(
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
    });
    expect(typeof token).toBe("string");
    let verified: IJwtData | Error | null = (await verifyTokenAsync(
      token
    )) as IJwtData;
    expect(verified.resetEmail).toBe("reset email");
    expect(verified.uuid).toBe(theUuid);
  });
  test("the token signing returns an error string as the token", async () => {
    //@ts-expect-error just for testing that the token could not be signed without an arguments
    const token = signToken({});
    expect(typeof token).toBe("string");
    let verified: IJwtData | Error | null = (await verifyTokenAsync(
      token
    )) as IJwtData;
    expect(verified instanceof Error).toBe(true);
  });
});
