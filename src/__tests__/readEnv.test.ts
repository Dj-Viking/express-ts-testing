import { readEnv } from "../utils/readEnv";

describe("readenv test", () => {
  test("that readenv is correctly parsing and setting process.env when ENV_TXT is undefined", () => {
    readEnv();
    expect(typeof process.env.ENV_TXT).toBe("string");
    expect(typeof process.env.SECRET).toBe("string");
  });
});
