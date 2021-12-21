"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const signToken_1 = require("../utils/signToken");
const verifyTokenAsync_1 = require("../utils/verifyTokenAsync");
const uuid = require("uuid");
describe("test the sign token branches", () => {
    test("the token signs with the correct args for login/signup token", () => __awaiter(void 0, void 0, void 0, function* () {
        const theUuid = uuid.v4();
        const token = (0, signToken_1.signToken)({
            username: "username",
            email: "email",
            uuid: theUuid,
            _id: "someid",
            role: "user",
        });
        expect(typeof token).toBe("string");
        let verified = (yield (0, verifyTokenAsync_1.verifyTokenAsync)(token));
        expect(verified instanceof Error).toBe(false);
        expect(verified.email).toBe("email");
        expect(verified.username).toBe("username");
        expect(verified.uuid).toBe(theUuid);
        expect(verified.role).toBe("user");
        expect(verified._id).toBe("someid");
    }));
    test("the token signs with correct args for reset password token", () => __awaiter(void 0, void 0, void 0, function* () {
        const theUuid = uuid.v4();
        const token = (0, signToken_1.signToken)({
            resetEmail: "reset email",
            uuid: theUuid,
            exp: "5m",
        });
        expect(typeof token).toBe("string");
        let verified = (yield (0, verifyTokenAsync_1.verifyTokenAsync)(token));
        expect(verified.resetEmail).toBe("reset email");
        expect(verified.uuid).toBe(theUuid);
    }));
    test("the token signing returns an error string as the token", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = (0, signToken_1.signToken)({});
        expect(typeof token).toBe("string");
        let verified = (yield (0, verifyTokenAsync_1.verifyTokenAsync)(token));
        expect(verified instanceof Error).toBe(true);
    }));
});
//# sourceMappingURL=signToken.test.js.map