import { Router } from "express";
import { RequestHandler } from "express-serve-static-core";
import { UserController } from "../controllers/UserController";
import { authMiddleware } from "../middleware/authMiddleware";
const router = Router();
const { createUser, getAllUsers, updateUserById, getUserById, deleteUserById } =
  UserController;

// /user
router.route("/").post(createUser).get(getAllUsers);
// /user/:id
router
  .route("/:id")
  .put(authMiddleware as RequestHandler, updateUserById)
  .get(getUserById)
  .delete(deleteUserById);

export default router;
