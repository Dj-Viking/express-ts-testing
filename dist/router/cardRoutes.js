"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CardController_1 = require("../controllers/CardController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
const { createCard, updateCardById } = CardController_1.CardController;
router.route("/").post(authMiddleware_1.authMiddleware, createCard);
router.route("/:id").put(authMiddleware_1.authMiddleware, updateCardById);
exports.default = router;
//# sourceMappingURL=cardRoutes.js.map