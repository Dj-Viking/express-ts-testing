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
const app_1 = __importDefault(require("../app"));
const app = (0, app_1.default)();
describe("test the 404 route when fetching a route that doesn't exist", () => {
    test("/GET /randomroute to test the 404 route", () => __awaiter(void 0, void 0, void 0, function* () {
        const notFound = yield (0, supertest_1.default)(app).get("/randomroute");
        expect(notFound.statusCode).toBe(404);
        expect(notFound.text).toBe("<h1>Page not found</h1>");
    }));
});
//# sourceMappingURL=404.test.js.map