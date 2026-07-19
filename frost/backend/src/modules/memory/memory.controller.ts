import { Request, Response } from "express";
import * as memoryService from "./memory.service";

export async function search(req: Request, res: Response) {
  try {
    const query = typeof req.query.q === "string" ? req.query.q : "";
    const results = await memoryService.searchMemory(query);
    return res.status(501).json({
      status: "not_implemented",
      message: "Memory/RAG search will be wired to pgvector later",
      results,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return res.status(400).json({ error: message });
  }
}
