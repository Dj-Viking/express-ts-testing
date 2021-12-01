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
exports.authMiddleware = void 0;
const verifyTokenAsync_1 = require("../utils/verifyTokenAsync");
function authMiddleware(req, res, next) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const token = ((_b = (_a = req === null || req === void 0 ? void 0 : req.headers) === null || _a === void 0 ? void 0 : _a.authorization) === null || _b === void 0 ? void 0 : _b.split(" ")[1]) || null;
        console.log("what is token in middle ware", token);
        if (!token)
            return res.status(401).json({ error: "not authenticated" });
        (0, verifyTokenAsync_1.verifyTokenAsync)(token)
            .then((decoded) => {
            if (decoded instanceof Error)
                return res.status(403).json({ error: decoded });
            else
                return next();
        })
            .catch((error) => {
            return res.status(500).json({ error: error.stack });
        });
    });
}
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map