import { Router } from "express";
import prisma from "../config/prisma";

const router = Router();

router.get("/", async (_, res) => {
  const conversations = await prisma.conversation.findMany();

  res.json(conversations);
});

export default router;