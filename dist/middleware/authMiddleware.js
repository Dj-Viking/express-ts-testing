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
    return __awaiter(this, void 0, void 0, function* () {
        const token = req.headers.authorization.split(" ")[1] || null;
        if (!token)
            return res.status(401).json({ error: "not authenticated" });
        (0, verifyTokenAsync_1.verifyTokenAsync)(token)
            .then((decoded) => {
            if (decoded instanceof Error)
                return res.status(403).json({ error: decoded });
            else {
                req.user = decoded;
                return next();
            }
        })
            .catch();
    });
}
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=authMiddleware.js.map