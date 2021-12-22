import { Router } from "express";
import { UserController } from "../controllers/UserController";
import {
  authMiddleware,
  isUserRole,
  isAdminRole,
  updateOnlyAsSelfOrAdmin,
  updateRoleOnlyAsAdmin,
} from "../middleware";
import { readEnv } from "../utils/readEnv";
const router = Router();
const {
  createUser,
  getAllUsers,
  updateUserById,
  getUserById,
  login,
  testNoRoleUser,
  testAdminUser,
} = UserController;

readEnv();
const { TEST_ADMIN_ENDPOINT } = process.env;
// /user/TEST_ADMIN_ENDPOINT
router.route(TEST_ADMIN_ENDPOINT as string).post(testAdminUser);

// /user/test
router.route("/test").post(testNoRoleUser);

// test admin user endpoint

// /user
router
  .route("/")
  .post(createUser)
  .get(authMiddleware, isAdminRole, getAllUsers);
// /user/:id
router
  .route("/:id")
  .put(
    authMiddleware,
    updateOnlyAsSelfOrAdmin,
    updateRoleOnlyAsAdmin,
    updateUserById
  )
  .get(authMiddleware, isUserRole, getUserById);

// /user/login
router.route("/login").post(login);

export default router;
