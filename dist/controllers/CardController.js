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
exports.CardController = void 0;
const Card_1 = __importDefault(require("../models/Card"));
exports.CardController = {
    createCard: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = Object.assign({}, req.body);
            console.log("what is body payload on create card route", payload);
            try {
                const createdCard = yield Card_1.default.create(payload);
                return res.status(201).json({ card: createdCard });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: error.message || error });
            }
        });
    },
    updateCardById: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundCard = yield Card_1.default.findOne({ _id: req.params.id });
            if (foundCard === null) {
                return res.status(404).json({ message: "card not found" });
            }
            try {
                console.log("\x1b[33m", "request to update a card", "\x1b[00m", req.body, req.params);
                const updatedCard = yield Card_1.default.findOneAndUpdate({
                    _id: req.params.id,
                }, Object.assign({}, req.body), { new: true });
                console.log("updated card mongo response", { card: updatedCard });
                return res.status(200).json({ card: updatedCard });
            }
            catch (error) {
                return res.status(500).json({
                    error: `error when updating a card by id ${error}`,
                });
            }
        });
    },
};
//# sourceMappingURL=CardController.js.map