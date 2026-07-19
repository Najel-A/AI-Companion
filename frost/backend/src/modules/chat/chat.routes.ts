import { Router } from "express";
import * as chatController from "./chat.controller";

const router = Router();

router.post("/message", chatController.sendMessage);

export default router;
