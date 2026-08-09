import * as conversationRepository from "./conversation.repository";
import * as chatService from "../chat/chat.service";

export async function createConversation(title: string) {
  const trimmed = title.trim();

  if (!trimmed) {
    throw new Error("Title is required");
  }

  return conversationRepository.create(trimmed);
}

export async function listConversations() {
  return conversationRepository.findAll();
}

export async function getConversation(id: string) {
  const conversation = await conversationRepository.findById(id);

  if (!conversation) {
    throw new Error("Conversation not found");
  }

  return conversation;
}

export async function deleteConversation(id: string) {
  await getConversation(id);

  return conversationRepository.remove(id);
}

export async function addMessage(
  conversationId: string,
  content: string
) {
  // Make sure the conversation exists
  await getConversation(conversationId);

  const trimmedContent = content.trim();

  if (!trimmedContent) {
    throw new Error("Message content is required");
  }

  // Save user's message
  const userMessage = await conversationRepository.createMessage(
    conversationId,
    "user",
    trimmedContent
  );

  // Generate Frost's response
  const reply = await chatService.generateReply(trimmedContent);

  // Save Frost's response
  const assistantMessage = await conversationRepository.createMessage(
    conversationId,
    "assistant",
    reply
  );

  return {
    userMessage,
    assistantMessage,
  };
}