import { Router } from "express";
import { CardController } from "../controllers/CardController";
import { authMiddleware } from "../middleware/authMiddleware";
const router = Router();
const { createCard, updateCardById } = CardController;

// /card
router.route("/").post(authMiddleware, createCard);
// /card/:id
router.route("/:id").put(authMiddleware, updateCardById);

export default router;
