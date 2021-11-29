import { Router } from "express";
import { CardController } from "../controllers/CardController";
const router = Router();
const { createCard, updateCardById } = CardController;

// /card
router.route("/").post(createCard);
// /card/:id
router.route("/:id").put(updateCardById);

export default router;
