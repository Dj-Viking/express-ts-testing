"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.use("/", (_, res) => {
    return res.status(200).send("<h1>Hello 123123</h1>");
});
router.use((_req, res) => {
    return res.status(404).send("<h1>Page not found</h1>");
});
exports.default = router;
//# sourceMappingURL=index.js.map