import * as conversationRepository from "./conversation.repository";

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
  role: string,
  content: string
) {
  await getConversation(conversationId);

  const trimmedRole = role.trim();
  const trimmedContent = content.trim();

  if (!trimmedRole || !trimmedContent) {
    throw new Error("Role and content are required");
  }

  return conversationRepository.createMessage(
    conversationId,
    trimmedRole,
    trimmedContent
  );
}
