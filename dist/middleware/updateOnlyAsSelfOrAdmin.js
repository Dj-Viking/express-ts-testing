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
exports.updateOnlyAsSelfOrAdmin = void 0;
function updateOnlyAsSelfOrAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { params } = req;
            switch (true) {
                case req.user.role === "admin" && params.id !== req.user._id:
                    return next();
                case params.id !== req.user._id && req.user.role === "user": {
                    return res.status(403).json({ message: "forbidden" });
                }
            }
            return next();
        }
        catch (error) { }
    });
}
exports.updateOnlyAsSelfOrAdmin = updateOnlyAsSelfOrAdmin;
//# sourceMappingURL=updateOnlyAsSelfOrAdmin.js.map