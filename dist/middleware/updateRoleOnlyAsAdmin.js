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
exports.updateRoleOnlyAsAdmin = void 0;
function updateRoleOnlyAsAdmin(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { body } = req;
            if (!req.user)
                return res.status(401).json({ message: "unauthorized" });
            if (!!body.role && body.role !== "user" && ((_a = req.user) === null || _a === void 0 ? void 0 : _a.role) !== "admin")
                return res.status(403).json({ message: "forbidden" });
            return next();
        }
        catch (error) {
            console.error(error);
            res
                .status(500)
                .json({ message: "oops! something went wrong, please try again later." });
        }
    });
}
exports.updateRoleOnlyAsAdmin = updateRoleOnlyAsAdmin;
//# sourceMappingURL=updateRoleOnlyAsAdmin.js.map