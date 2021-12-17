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
exports.cardNotFound = void 0;
const models_1 = require("../models");
function cardNotFound(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { params } = req;
            const cardToUpdate = yield models_1.Card.findOne({ _id: params.id });
            if (cardToUpdate === null)
                return res.status(404).json({ message: "card not found" });
            return next();
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Oops sorry this request could not be processed, please try again later.",
            });
        }
    });
}
exports.cardNotFound = cardNotFound;
//# sourceMappingURL=cardNotFound.js.map