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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const app_1 = __importDefault(require("../app"));
const constants_1 = require("../constants");
beforeEach((done) => {
    mongoose_1.default.connect(constants_1.LOCAL_DB_URL, {}, () => done());
});
afterEach((done) => {
    mongoose_1.default.connection.close(() => done());
});
const app = (0, app_1.default)();
let newUserId = null;
describe("testing some crud stuff on users", () => {
    test("POST /user request to create user without username", () => __awaiter(void 0, void 0, void 0, function* () {
        const noUsername = yield (0, supertest_1.default)(app).post("/user").send({
            username: "",
            email: "kdjfkdjfkj",
            password: "kdjfdjfj",
        });
        expect(noUsername.statusCode).toBe(400);
        expect(JSON.parse(noUsername.text).error).toBe("username is required.");
    }));
    test("POST /user request to create user without email", () => __awaiter(void 0, void 0, void 0, function* () {
        const noEmail = yield (0, supertest_1.default)(app).post("/user").send({
            username: "ksdjfkdf",
            email: "",
            password: "a;kdjfjkdfj",
        });
        expect(noEmail.statusCode).toBe(400);
        expect(JSON.parse(noEmail.text).error).toBe("email is required.");
    }));
    test("POST /user request to create user without password", () => __awaiter(void 0, void 0, void 0, function* () {
        const noPassword = yield (0, supertest_1.default)(app).post("/user").send({
            username: "ksdjfdj",
            email: "klsjdfj",
            password: "",
        });
        expect(noPassword.statusCode).toBe(400);
        expect(JSON.parse(noPassword.text).error).toBe("password is required.");
    }));
    test("POST /user create a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const createRes = yield (0, supertest_1.default)(app).post("/user").send({
            username: "123123",
            email: "123123",
            password: "adf",
        });
        console.log("\x1b[33m", "create2 response \n", JSON.stringify(createRes, null, 2), "\x1b[00m");
        expect(createRes.statusCode).toBe(201);
        expect(typeof JSON.parse(createRes.text).user._id).toBe("string");
        newUserId = JSON.parse(createRes.text).user._id;
    }));
    test("GET /user/:id with a bogus object id", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("previous id", newUserId);
        const invalidId = newUserId === null || newUserId === void 0 ? void 0 : newUserId.replace(newUserId[1], "f");
        console.log("created invalid id", invalidId);
        const notFound = yield (0, supertest_1.default)(app).get(`/user/${invalidId}`);
        expect(notFound.statusCode).toBe(404);
        expect(JSON.parse(notFound.text).message).toBe("user not found");
    }));
    test("GET /user/:id the user we just created in the previous test", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("what is user id here", newUserId);
        const getUserRes = yield (0, supertest_1.default)(app).get(`/user/${newUserId}`);
        console.log("\x1b[33m", "create response \n", JSON.stringify(getUserRes, null, 2), "\x1b[00m");
        expect(getUserRes.statusCode).toBe(200);
    }));
    test("PUT /user/:id update the user we just made", () => __awaiter(void 0, void 0, void 0, function* () {
        const updateRes = yield (0, supertest_1.default)(app).put(`/user/${newUserId}`).send({
            username: "updated username",
            email: "updated email",
        });
        console.log("\x1b[33m", "update response \n", JSON.stringify(updateRes, null, 2), "\x1b[00m");
        expect(updateRes.statusCode).toBe(200);
        expect(JSON.parse(updateRes.text).user.username).toBe("updated username");
        expect(JSON.parse(updateRes.text).user.email).toBe("updated email");
    }));
    test("delete the user we just made with the mongo client", () => __awaiter(void 0, void 0, void 0, function* () {
        yield User_1.default.findOneAndDelete({ _id: newUserId });
    }));
    test("POST /user create a user", () => __awaiter(void 0, void 0, void 0, function* () {
        const createRes2 = yield (0, supertest_1.default)(app).post("/user").send({
            username: "123123",
            email: "123123",
            password: "adf",
        });
        console.log("\x1b[33m", "create response \n", JSON.stringify(createRes2, null, 2), "\x1b[00m");
        expect(createRes2.statusCode).toBe(201);
        expect(typeof JSON.parse(createRes2.text).user._id).toBe("string");
        newUserId = JSON.parse(createRes2.text).user._id;
        expect(typeof JSON.parse(createRes2.text).user.token).toBe("string");
    }));
    test("delete the user we just made with the mongo client", () => __awaiter(void 0, void 0, void 0, function* () {
        yield User_1.default.findOneAndDelete({ _id: newUserId });
    }));
});
//# sourceMappingURL=user.test.js.map