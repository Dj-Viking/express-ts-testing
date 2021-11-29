import { Router } from "express";
import { UserController } from "../controllers/userController";
const router = Router();
const { createUser, getAllUsers, updateUserById } = UserController;

// /user
router.route("/").post(createUser).get(getAllUsers);
// /user/:id
router.route("/:id").put(updateUserById);

export default router;
