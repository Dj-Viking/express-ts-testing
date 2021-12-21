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
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
exports.CardController = {
    createCard: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdCard = yield models_1.Card.create(Object.assign({ _id: new mongoose_1.default.Types.ObjectId() }, req.body));
            const updatedCardWithCreatorId = yield models_1.Card.findOneAndUpdate({ _id: createdCard._id }, {
                creator: req.user._id,
            }, { new: true }).select("-__v");
            const foundUser = yield models_1.User.findOneAndUpdate({ _id: req.user._id }, { $push: { cards: updatedCardWithCreatorId } }, { new: true });
            return res.status(201).json({ cards: foundUser.cards });
        });
    },
    updateCardById: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedCard = yield models_1.Card.findOneAndUpdate({
                _id: req.params.id,
            }, Object.assign({}, req.body), { new: true });
            return res.status(200).json({ card: updatedCard });
        });
    },
};
//# sourceMappingURL=CardController.js.map