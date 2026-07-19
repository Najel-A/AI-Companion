import { Request, Response } from "express";
import * as chatService from "./chat.service";

export async function sendMessage(req: Request, res: Response) {
  try {
    const { message } = req.body;
    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    await chatService.generateReply(message);
    return res.status(501).json({
      status: "not_implemented",
      message: "Chat will be wired to Ollama later",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    if (message === "Chat generation is not implemented yet") {
      return res.status(501).json({
        status: "not_implemented",
        message: "Chat will be wired to Ollama later",
      });
    }
    return res.status(500).json({ error: message });
  }
}
