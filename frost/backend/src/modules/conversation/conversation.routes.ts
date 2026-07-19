import { Router } from "express";
import * as conversationController from "./conversation.controller";

const router = Router();

router.get("/", conversationController.list);
router.post("/", conversationController.create);
router.get("/:id", conversationController.getById);
router.delete("/:id", conversationController.remove);
router.post("/:id/messages", conversationController.addMessage);

export default router;
