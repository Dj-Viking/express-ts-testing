"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
const { createUser, getAllUsers } = userController_1.UserController;
router.route("/").post(createUser).get(getAllUsers);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map