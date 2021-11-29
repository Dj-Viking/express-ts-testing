"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CardController_1 = require("../controllers/CardController");
const router = (0, express_1.Router)();
const { createCard, updateCardById } = CardController_1.CardController;
router.route("/").post(createCard);
router.route("/:id").put(updateCardById);
exports.default = router;
//# sourceMappingURL=cardRoutes.js.map