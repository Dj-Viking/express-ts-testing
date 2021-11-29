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
const Card_1 = __importDefault(require("../models/Card"));
const app_1 = __importDefault(require("../app"));
const constants_1 = require("../constants");
beforeEach((done) => {
    mongoose_1.default.connect(constants_1.LOCAL_DB_URL, {}, () => done());
});
afterEach((done) => {
    mongoose_1.default.connection.close(() => done());
});
const app = (0, app_1.default)();
let newCardId = null;
describe("card CRUD stuff", () => {
    test("POST /card create a new card", () => __awaiter(void 0, void 0, void 0, function* () {
        const createCardRes = yield (0, supertest_1.default)(app)
            .post("/card")
            .send({
            frontsideText: "привет",
            frontsideLanguage: "Русский",
            frontsidePicture: "kdfjdjkfd",
            backsideText: "hello",
            backsideLanguage: "English",
            backsidePicture: "ksdjfdkj",
        });
        console.log("\x1b[33m", "create response \n", JSON.stringify(createCardRes, null, 2), "\x1b[00m");
        expect(createCardRes.statusCode).toBe(201);
        expect(typeof JSON.parse(createCardRes.text).card._id).toBe("string");
        newCardId = JSON.parse(createCardRes.text).card._id;
    }));
    test("delete the card we just made", () => __awaiter(void 0, void 0, void 0, function* () {
        yield Card_1.default.findOneAndDelete({ _id: newCardId });
    }));
});
//# sourceMappingURL=card.test.js.map