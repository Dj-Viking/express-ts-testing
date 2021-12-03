import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middleware/authMiddleware";
const router = Router();
const {
  createUser,
  getAllUsers,
  updateUserById,
  getUserById,
  deleteUserById,
  login,
} = UserController;

// /user
router.route("/").post(createUser).get(getAllUsers);
// /user/:id
router
  .route("/:id")
  .put(authMiddleware, updateUserById)
  .get(getUserById)
  .delete(deleteUserById);

// /user/login
router.route("/login").post(login);

export default router;
