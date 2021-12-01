"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
const { createUser, getAllUsers, updateUserById, getUserById, deleteUserById } = UserController_1.UserController;
router.route("/").post(createUser).get(getAllUsers);
router
    .route("/:id")
    .put(authMiddleware_1.authMiddleware, updateUserById)
    .get(getUserById)
    .delete(deleteUserById);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map