import { Router } from "express";
import { CardController } from "../controllers/CardController";
const router = Router();
const { createCard } = CardController;

// /user
router.route("/").post(createCard);

export default router;
