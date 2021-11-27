import { Router } from "express";
import { UserController } from "../controllers/userController";
const router = Router();
const { createUser, getAllUsers, updateUserById } = UserController;

router.route("/").post(createUser).get(getAllUsers).put(updateUserById);

export default router;
