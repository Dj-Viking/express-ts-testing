import { Router } from "express";
import { CardController } from "../controllers/CardController";
import {
  authMiddleware,
  cardNotFound,
  isUserRole,
  updateOnlyOwnCards,
} from "../middleware";
const router = Router();
const { createCard, updateCardById } = CardController;

// /card
router.route("/").post(authMiddleware, isUserRole, createCard);
// /card/:id
router
  .route("/:id")
  .put(
    authMiddleware,
    isUserRole,
    cardNotFound,
    updateOnlyOwnCards,
    updateCardById
  );

export default router;
