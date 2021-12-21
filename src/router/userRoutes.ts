import { Router } from "express";
import { UserController } from "../controllers/UserController";
import {
  authMiddleware,
  isUserRole,
  isAdminRole,
  updateOnlyAsSelfOrAdmin,
  updateRoleOnlyAsAdmin,
} from "../middleware";
const router = Router();
const {
  createUser,
  getAllUsers,
  updateUserById,
  getUserById,
  login,
  testNoRoleUser,
} = UserController;

// /user/test
router.route("/test").post(testNoRoleUser);

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
    isUserRole,
    updateOnlyAsSelfOrAdmin,
    updateRoleOnlyAsAdmin,
    updateUserById
  )
  .get(authMiddleware, isUserRole, getUserById);

// /user/login
router.route("/login").post(login);

export default router;
