import { Router } from "express";
import userRoutes from "./userRoutes";
const router = Router();

router.use("/hello", (_, res) => {
  return res.status(200).send("<h1>Hello 123123</h1>");
});

router.use("/user", userRoutes);

router.use((_req, res) => {
  return res.status(404).send("<h1>Page not found</h1>");
});

export default router;
