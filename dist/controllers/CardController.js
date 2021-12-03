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
exports.CardController = void 0;
const models_1 = require("../models");
exports.CardController = {
    createCard: function (req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdCard = yield models_1.Card.create(Object.assign({}, req.body));
                const updatedCardWithCreatorId = yield models_1.Card.findOneAndUpdate({ _id: createdCard._id }, {
                    creator: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
                }, { new: true }).select("-__v");
                const foundUser = yield models_1.User.findOneAndUpdate({ _id: (_b = req.user) === null || _b === void 0 ? void 0 : _b._id }, { $push: { cards: updatedCardWithCreatorId } }, { new: true });
                if (foundUser === null)
                    return res.status(401).json({
                        error: "not authenticated can't add a card to a non user's collection",
                    });
                return res.status(201).json({ cards: foundUser.cards });
            }
            catch (error) {
                console.error(error);
                return res.status(500).json({ error: error.message || error });
            }
        });
    },
    updateCardById: function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const foundCard = yield models_1.Card.findOne({ _id: req.params.id });
            if (foundCard === null) {
                return res.status(404).json({ message: "card not found" });
            }
            try {
                const updatedCard = yield models_1.Card.findOneAndUpdate({
                    _id: req.params.id,
                }, Object.assign({}, req.body), { new: true });
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