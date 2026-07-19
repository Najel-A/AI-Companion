import { Request, Response } from "express";
import * as conversationService from "./conversation.service";

export async function create(req: Request, res: Response) {
  try {
    const { title } = req.body;
    if (typeof title !== "string") {
      return res.status(400).json({ error: "Title must be a string" });
    }

    const conversation = await conversationService.createConversation(title);
    return res.status(201).json(conversation);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return res.status(400).json({ error: message });
  }
}

export async function list(_req: Request, res: Response) {
  try {
    const conversations = await conversationService.listConversations();
    return res.json(conversations);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ error: message });
  }
}

export async function getById(req: Request, res: Response) {
  try {
    const conversation = await conversationService.getConversation(req.params.id);
    return res.json(conversation);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "Conversation not found" ? 404 : 500;
    return res.status(status).json({ error: message });
  }
}

export async function remove(req: Request, res: Response) {
  try {
    await conversationService.deleteConversation(req.params.id);
    return res.status(204).send();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "Conversation not found" ? 404 : 500;
    return res.status(status).json({ error: message });
  }
}

export async function addMessage(req: Request, res: Response) {
  try {
    const { role, content } = req.body;
    if (typeof role !== "string" || typeof content !== "string") {
      return res.status(400).json({ error: "Role and content must be strings" });
    }

    const message = await conversationService.addMessage(
      req.params.id,
      role,
      content
    );
    return res.status(201).json(message);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "Conversation not found" ? 404 : 400;
    return res.status(status).json({ error: message });
  }
}
