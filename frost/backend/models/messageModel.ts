import prisma from "../src/config/prisma";

export async function createMessage(
  conversationId: string,
  role: string,
  content: string
) {
  return prisma.message.create({
    data: { conversationId, role, content },
  });
}

export async function listMessagesByConversation(conversationId: string) {
  return prisma.message.findMany({
    where: { conversationId },
    orderBy: { createdAt: "asc" },
  });
}
