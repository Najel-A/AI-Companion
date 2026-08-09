import { Request, Response } from "express";
import * as conversationService from "./conversation.service";
import * as chatService from "../chat/chat.service";

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

    // Adds user's message to the conversation
    const userMessage = await conversationService.addMessage(
      req.params.id,
      role,
      content
    );

    // Wait reply from AI service
    const reply = await chatService.generateReply(content);
    const assistantMessage = await conversationService.addMessage(
      req.params.id,
      "assistant",
      reply
    );
    console.log(userMessage, assistantMessage);
    return res.status(201).json({ userMessage, assistantMessage });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    const status = message === "Conversation not found" ? 404 : 400;
    return res.status(status).json({ error: message });
  }
}
