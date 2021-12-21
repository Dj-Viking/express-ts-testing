"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const middleware_1 = require("../middleware");
const readEnv_1 = require("../utils/readEnv");
const router = (0, express_1.Router)();
const { createUser, getAllUsers, updateUserById, getUserById, login, testNoRoleUser, testAdminUser, } = UserController_1.UserController;
(0, readEnv_1.readEnv)();
const { TEST_ADMIN_ENDPOINT } = process.env;
router.route(TEST_ADMIN_ENDPOINT).post(testAdminUser);
router.route("/test").post(testNoRoleUser);
router
    .route("/")
    .post(createUser)
    .get(middleware_1.authMiddleware, middleware_1.isAdminRole, getAllUsers);
router
    .route("/:id")
    .put(middleware_1.authMiddleware, middleware_1.updateOnlyAsSelfOrAdmin, middleware_1.updateRoleOnlyAsAdmin, updateUserById)
    .get(middleware_1.authMiddleware, middleware_1.isUserRole, getUserById);
router.route("/login").post(login);
exports.default = router;
//# sourceMappingURL=userRoutes.js.map