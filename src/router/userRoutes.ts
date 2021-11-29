import { Router } from "express";
import { UserController } from "../controllers/UserController";
const router = Router();
const { createUser, getAllUsers, updateUserById, getUserById, deleteUserById } =
  UserController;

// /user
router.route("/").post(createUser).get(getAllUsers);
// /user/:id
router
  .route("/:id")
  .put(updateUserById)
  .get(getUserById)
  .delete(deleteUserById);

export default router;
