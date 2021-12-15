"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CardController_1 = require("../controllers/CardController");
const middleware_1 = require("../middleware");
const router = (0, express_1.Router)();
const { createCard, updateCardById } = CardController_1.CardController;
router.route("/").post(middleware_1.authMiddleware, middleware_1.isUserRole, createCard);
router.route("/:id").put(middleware_1.authMiddleware, middleware_1.isUserRole, updateCardById);
exports.default = router;
//# sourceMappingURL=cardRoutes.js.map