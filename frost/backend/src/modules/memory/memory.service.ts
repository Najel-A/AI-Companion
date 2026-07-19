import * as memoryRepository from "./memory.repository";

export async function searchMemory(query: string) {
  const trimmed = query.trim();
  if (!trimmed) {
    throw new Error("Query is required");
  }

  return memoryRepository.search(trimmed);
}
