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
const models_2 = require("../models");
beforeEach((done) => {
    mongoose_1.default.connect(constants_1.LOCAL_DB_URL, {}, () => done());
});
afterEach((done) => {
    mongoose_1.default.connection.close(() => done());
});
const app = (0, app_1.default)();
let newCardId = null;
let newUserId = null;
let newUserToken = null;
describe("card CRUD stuff", () => {
    test("POST /user create a new user to start adding cards to their library", () => __awaiter(void 0, void 0, void 0, function* () {
        const createRes = yield (0, supertest_1.default)(app).post("/user").send({
            username: constants_1.TEST_USERNAME,
            email: constants_1.TEST_EMAIL,
            password: constants_1.TEST_PASSWORD,
        });
        expect(createRes.statusCode).toBe(201);
        expect(typeof JSON.parse(createRes.text).user._id).toBe("string");
        newUserId = JSON.parse(createRes.text).user._id;
        expect(typeof JSON.parse(createRes.text).user.token).toBe("string");
        newUserToken = JSON.parse(createRes.text).user.token;
    }));
    test("POST /card create a new card", () => __awaiter(void 0, void 0, void 0, function* () {
        const createCardRes = yield (0, supertest_1.default)(app)
            .post("/card")
            .set({
            authorization: `Bearer ${newUserToken}`,
        })
            .send({
            frontsideText: "привет",
            frontsideLanguage: "Русский",
            frontsidePicture: "front side picture text",
            backsideText: "hello",
            backsideLanguage: "English",
            backsidePicture: "ksdjfdkj",
        });
        console.log("\x1b[33m", "create response \n", JSON.stringify(createCardRes, null, 2), "\x1b[00m");
        const parsedJSON = JSON.parse(createCardRes.text);
        expect(createCardRes.statusCode).toBe(201);
        expect(parsedJSON.cards).toHaveLength(1);
        expect(typeof parsedJSON.cards[0]).toBe("string");
        newCardId = parsedJSON.cards[0];
        const createdCard = yield models_1.Card.findOne({ _id: newCardId });
        expect(typeof (createdCard === null || createdCard === void 0 ? void 0 : createdCard.frontsidePicture)).toBe("string");
        expect(createdCard === null || createdCard === void 0 ? void 0 : createdCard.frontsidePicture).toBe("front side picture text");
    }));
    test("PUT /card/:id update card with bogus id", () => __awaiter(void 0, void 0, void 0, function* () {
        console.log("previous id", newCardId);
        const bogusId = newCardId === null || newCardId === void 0 ? void 0 : newCardId.replace(newCardId[1], "f");
        console.log("bogus id", bogusId);
        const notFound = yield (0, supertest_1.default)(app)
            .put(`/card/${bogusId}`)
            .set({ authorization: `Bearer ${newUserToken}` });
        expect(notFound.statusCode).toBe(404);
        expect(JSON.parse(notFound.text).message).toBe("card not found");
    }));
    test("PUT /card/:id update a card by it's id", () => __awaiter(void 0, void 0, void 0, function* () {
        const updateCardRes = yield (0, supertest_1.default)(app)
            .put(`/card/${newCardId}`)
            .set({ authorization: `Bearer ${newUserToken}` })
            .send({
            frontsideText: "updated front side text",
        });
        console.log("\x1b[33m", "update response \n", JSON.stringify(updateCardRes, null, 2), "\x1b[00m");
        expect(updateCardRes.statusCode).toBe(200);
        expect(JSON.parse(updateCardRes.text).card.frontsideText).toBe("updated front side text");
    }));
    test("delete the card we just made", () => __awaiter(void 0, void 0, void 0, function* () {
        yield models_1.Card.findOneAndDelete({ _id: newCardId });
    }));
    test("delete the user we just made", () => __awaiter(void 0, void 0, void 0, function* () {
        yield models_2.User.findOneAndDelete({ _id: newUserId });
    }));
});
//# sourceMappingURL=card.test.js.map