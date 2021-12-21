"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const readEnv_1 = require("../utils/readEnv");
describe("readenv test", () => {
    test("that readenv is correctly parsing and setting process.env when ENV_TXT is undefined", () => {
        (0, readEnv_1.readEnv)();
        expect(typeof process.env.ENV_TXT).toBe("string");
        expect(typeof process.env.SECRET).toBe("string");
    });
});
//# sourceMappingURL=readEnv.test.js.map