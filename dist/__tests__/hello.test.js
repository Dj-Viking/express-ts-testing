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
const app_1 = __importDefault(require("../app"));
const constants_1 = require("../constants");
beforeEach((done) => {
    mongoose_1.default.connect(constants_1.LOCAL_DB_URL, {}, () => done());
});
afterEach((done) => {
    mongoose_1.default.connection.db.dropDatabase(() => {
        mongoose_1.default.connection.close(() => done());
    });
});
const app = (0, app_1.default)();
describe("test the hello route", () => {
    test("should get 200 status code", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/hello");
        expect(res.statusCode).toBe(200);
    }));
    test("we should get <h1>Hello 123123</h1> text as html from the response", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield (0, supertest_1.default)(app).get("/hello");
        expect(res.text).toBe("<h1>Hello 123123</h1>");
    }));
});
//# sourceMappingURL=hello.test.js.map