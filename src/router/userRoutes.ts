import { Router } from "express";
import { UserController } from "../controllers/userController";
const router = Router();
const { createUser, getAllUsers } = UserController;

router.route("/").post(createUser).get(getAllUsers);

export default router;
