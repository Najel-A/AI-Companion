import { Request, Response } from "express";
import * as chatService from "./chat.service";

export async function sendMessage(req: Request, res: Response) {
  try {
    const { message } = req.body;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        error: "Message is required",
      });
    }

    const reply = await chatService.generateReply(message);
    console.log(reply);
    return res.status(200).json({
      response: reply,
    });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";

    return res.status(500).json({
      error: message,
    });
  }
}