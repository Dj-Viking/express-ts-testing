"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userRoutes_1 = __importDefault(require("./userRoutes"));
const cardRoutes_1 = __importDefault(require("./cardRoutes"));
const router = (0, express_1.Router)();
router.use("/hello", (_, res) => {
    return res.status(200).send("<h1>Hello 123123</h1>");
});
router.use("/user", userRoutes_1.default);
router.use("/card", cardRoutes_1.default);
router.use((_req, res) => {
    return res.status(404).send("<h1>Page not found</h1>");
});
exports.default = router;
//# sourceMappingURL=index.js.map