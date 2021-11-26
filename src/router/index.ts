import { Router } from "express";
const router = Router();

router.use("/", (_, res) => {
  return res.status(200).send("<h1>Hello 123123</h1>");
});

router.use((_req, res) => {
  return res.status(404).send("<h1>Page not found</h1>");
});

export default router;
