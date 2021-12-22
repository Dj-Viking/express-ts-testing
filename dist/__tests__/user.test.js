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
const models_1 = require("../models");
const app_1 = __importDefault(require("../app"));
const constants_1 = require("../constants");
const signToken_1 = require("../utils/signToken");
const verifyTokenAsync_1 = require("../utils/verifyTokenAsync");
const readEnv_1 = require("../utils/readEnv");
const uuid = require("uuid");
(0, readEnv_1.readEnv)();
const { EXPIRED_TOKEN, INVALID_SIGNATURE, TEST_ADMIN_ENDPOINT } = process.env;
beforeEach((done) => {
    mongoose_1.default.connect(constants_1.LOCAL_DB_URL, {}, () => done());
});
afterEach((done) => {
    mongoose_1.default.connection.close(() => done());
});
const app = (0, app_1.default)();
let newUserId = null;
let newUserToken = null;
let adminUserId = null;
let adminToken = null;
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
            username: constants_1.TEST_USERNAME,
            email: constants_1.TEST_EMAIL,
            password: constants_1.TEST_PASSWORD,
        });
        const parsed = JSON.parse(createRes.text);
        expect(createRes.statusCode).toBe(201);
        expect(typeof parsed.user._id).toBe("string");
        newUserId = parsed.user._id;
        expect(typeof parsed.user.role).toBe("string");
        expect(typeof parsed.user.token).toBe("string");
        newUserToken = parsed.user.token;
        expect(parsed.user.role).toBe("user");
    }));
    test("GET /user any user cannot query all users", () => __awaiter(void 0, void 0, void 0, function* () {
        const cannotGet = yield (0, supertest_1.default)(app)
            .get("/user")
            .set({
            authorization: `Bearer ${newUserToken}`,
        });
        expect(cannotGet.statusCode).toBe(403);
    }));
    test("GET /user/:id with a bogus object id", () => __awaiter(void 0, void 0, void 0, function* () {
        const invalidId = newUserId === null || newUserId === void 0 ? void 0 : newUserId.replace(newUserId[1], "f");
        const notFound = yield (0, supertest_1.default)(app)
            .get(`/user/${invalidId}`)
            .set({
            authorization: `Bearer ${newUserToken}`,
        });
        expect(notFound.statusCode).toBe(404);
        expect(JSON.parse(notFound.text).message).toBe("user not found");
    }));
    test("GET /user/:id the user we just created in previous test without a token", () => __awaiter(void 0, void 0, void 0, function* () {
        const getUser = yield (0, supertest_1.default)(app)
            .get(`/user/${newUserId}`)
            .set({ authorization: `Bearer kdfkdjf` });
        expect(getUser.statusCode).toBe(403);
    }));
    test("GET /user test get all users as non admin should get 403", () => __awaiter(void 0, void 0, void 0, function* () {
        const forbidden = yield (0, supertest_1.default)(app)
            .get("/user")
            .set({ authorization: `Bearer ${newUserToken}` });
        expect(forbidden.statusCode).toBe(403);
        expect(JSON.parse(forbidden.text).message).toBe("forbidden");
    }));
    test("GET /user test get all users route only with an admin role", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminUuid = uuid.v4();
        const adminToken = (0, signToken_1.signToken)({
            adminUuid,
        });
        expect(typeof adminToken).toBe("string");
        const verified = (yield (0, verifyTokenAsync_1.verifyTokenAsync)(adminToken));
        expect(verified instanceof Error).toBe(false);
        expect(verified.role).toBe("admin");
        const getAllUsers = yield (0, supertest_1.default)(app)
            .get("/user")
            .set({ authorization: `Bearer ${adminToken}` });
        expect(getAllUsers.statusCode).toBe(200);
        expect(JSON.parse(getAllUsers.text).users).toHaveLength(1);
    }));
    test("GET /user/:id the user we just created in the previous test", () => __awaiter(void 0, void 0, void 0, function* () {
        const getUserRes = yield (0, supertest_1.default)(app)
            .get(`/user/${newUserId}`)
            .set({
            authorization: `Bearer ${newUserToken}`,
        });
        expect(getUserRes.statusCode).toBe(200);
    }));
    test("delete the user we just made with the mongo client", () => __awaiter(void 0, void 0, void 0, function* () {
        yield models_1.User.findOneAndDelete({ _id: newUserId });
    }));
    test("POST /user create a user and verify they recieved a token", () => __awaiter(void 0, void 0, void 0, function* () {
        const createRes2 = yield (0, supertest_1.default)(app).post("/user").send({
            username: constants_1.TEST_USERNAME,
            email: constants_1.TEST_EMAIL,
            password: constants_1.TEST_PASSWORD,
        });
        const parsed = JSON.parse(createRes2.text);
        expect(createRes2.statusCode).toBe(201);
        expect(typeof parsed.user._id).toBe("string");
        newUserId = parsed.user._id;
        expect(typeof parsed.user.token).toBe("string");
        expect(typeof parsed.user.role).toBe("string");
        newUserToken = parsed.user.token;
    }));
    test("POST a test admin user using secret endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const adminUser = yield (0, supertest_1.default)(app)
            .post(`/user/${TEST_ADMIN_ENDPOINT}`)
            .send({
            username: "test admin",
            password: "test pass",
            email: "test admin email",
        });
        const parsed = JSON.parse(adminUser.text).user;
        expect(adminUser.statusCode).toBe(201);
        expect(typeof parsed._id).toBe("string");
        adminUserId = parsed._id;
        expect(parsed.role).toBe("admin");
        adminToken = parsed.token;
    }));
    test("PUT /user/:id update a user as an admin", () => __awaiter(void 0, void 0, void 0, function* () {
        const update = yield (0, supertest_1.default)(app)
            .put(`/user/${newUserId}`)
            .set({ authorization: `Bearer ${adminToken}` })
            .send({ username: "updated username", role: "superman" });
        const parsed = JSON.parse(update.text).user;
        expect(update.statusCode).toBe(200);
        expect(parsed.role).toBe("superman");
    }));
    test("PUT /user/:id update the user with blank token get 401 status code", () => __awaiter(void 0, void 0, void 0, function* () {
        const updateRes = yield (0, supertest_1.default)(app)
            .put(`/user/${newUserId}`)
            .set({ authorization: `Bearer ` })
            .send({
            username: "updated username",
            email: "updated email",
        });
        expect(updateRes.statusCode).toBe(401);
        expect(JSON.parse(updateRes.text).error).toBe("not authenticated");
    }));
    test("PUT /user/:id update the user with malformed token get jwt malformed error", () => __awaiter(void 0, void 0, void 0, function* () {
        const updateRes = yield (0, supertest_1.default)(app)
            .put(`/user/${newUserId}`)
            .set({ authorization: `Bearer ajkls;dfjnas;kldfj` })
            .send({
            username: "updated username",
            email: "updated email",
        });
        expect(updateRes.statusCode).toBe(403);
        expect(JSON.parse(updateRes.text).error.message).toBe("jwt malformed");
    }));
    test("put /user/:id update user with an expired token should get expired error", () => __awaiter(void 0, void 0, void 0, function* () {
        const updateRes = yield (0, supertest_1.default)(app)
            .put(`/user/${newUserId}`)
            .set({
            authorization: `Bearer ${EXPIRED_TOKEN}`,
        })
            .send({ username: "updated username", email: "updated email" });
        expect(updateRes.statusCode).toBe(403);
        expect(JSON.parse(updateRes.text).error.message).toBe("jwt expired");
    }));
    test("PUT /user/:id update user with a token that has an invalid token and return error response", () => __awaiter(void 0, void 0, void 0, function* () {
        const updateRes = yield (0, supertest_1.default)(app)
            .put(`/user/${newUserId}`)
            .set({ authorization: `Bearer ${INVALID_SIGNATURE}` })
            .send({ username: "updated username", email: "updated email" });
        expect(updateRes.statusCode).toBe(403);
        expect(JSON.parse(updateRes.text).error.message).toBe("invalid signature");
    }));
    test("PUT /user/:id update the user just made when id in params doesn't match the id of the requestor should 403", () => __awaiter(void 0, void 0, void 0, function* () {
        const updateRes = yield (0, supertest_1.default)(app)
            .put(`/user/jdfkj`)
            .set({ authorization: `Bearer ${newUserToken}` })
            .send({ username: "updated username", email: "updated email" });
        expect(updateRes.statusCode).toBe(403);
    }));
    test("PUT /user/:id any user should not be able to update their role from user to admin", () => __awaiter(void 0, void 0, void 0, function* () {
        const updateRes = yield (0, supertest_1.default)(app)
            .put(`/user/${newUserId}`)
            .set({ authorization: `Bearer ${newUserToken}` })
            .send({
            username: "updated username",
            email: "updated email",
            role: "admin",
        });
        expect(updateRes.statusCode).toBe(403);
    }));
    test("PUT /user/:id update the user we just made with a valid token", () => __awaiter(void 0, void 0, void 0, function* () {
        const updateRes = yield (0, supertest_1.default)(app)
            .put(`/user/${newUserId}`)
            .set({ authorization: `Bearer ${newUserToken}` })
            .send({
            username: "updated username",
            email: "updated email",
        });
        expect(updateRes.statusCode).toBe(200);
        expect(JSON.parse(updateRes.text).user.username).toBe("updated username");
        expect(JSON.parse(updateRes.text).user.email).toBe("updated email");
    }));
    test("POST /user/login test the login route without a password or email and get 422", () => __awaiter(void 0, void 0, void 0, function* () {
        const noLogin = yield (0, supertest_1.default)(app).post("/user/login");
        expect(noLogin.statusCode).toBe(422);
        expect(JSON.parse(noLogin.text).error).toBe("unprocessable entity");
    }));
    test("POST /user/login test the login route and we also return a new token", () => __awaiter(void 0, void 0, void 0, function* () {
        const loginRes = yield (0, supertest_1.default)(app).post("/user/login").send({
            email: "updated email",
            password: constants_1.TEST_PASSWORD,
        });
        expect(loginRes.statusCode).toBe(200);
        const parsed = JSON.parse(loginRes.text);
        expect(typeof parsed.user.token).toBe("string");
    }));
    test("POST /user/login test with garbage email the login errors appear", () => __awaiter(void 0, void 0, void 0, function* () {
        const badCreds = yield (0, supertest_1.default)(app).post("/user/login").send({
            email: "kdjfkdjf",
            password: constants_1.TEST_PASSWORD,
        });
        expect(badCreds.statusCode).toBe(400);
        expect(JSON.parse(badCreds.text).error).toBe("incorrect credentials");
    }));
    test("POST /user/login test with garbage email the login errors appear", () => __awaiter(void 0, void 0, void 0, function* () {
        const badCreds = yield (0, supertest_1.default)(app).post("/user/login").send({
            email: "updated email",
            password: "ksdjfkdjfkj",
        });
        expect(badCreds.statusCode).toBe(400);
        expect(JSON.parse(badCreds.text).error).toBe("incorrect credentials");
    }));
    test("delete the user we just made with the mongoose client", () => __awaiter(void 0, void 0, void 0, function* () {
        yield models_1.User.findOneAndDelete({ _id: newUserId });
        yield models_1.User.findOneAndDelete({ _id: adminUserId });
    }));
});
//# sourceMappingURL=user.test.js.map