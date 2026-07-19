import { Router } from "express";

const router = Router();

router.get("/", (_, res) => {
  res.json({
    status: "ok",
    service: "Frost Backend",
    timestamp: new Date()
  });
});

export default router;