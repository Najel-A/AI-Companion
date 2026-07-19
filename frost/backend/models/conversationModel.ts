import prisma from "../src/config/prisma";

export async function createConversation(title: string) {
  return prisma.conversation.create({
    data: { title },
  });
}

export async function getConversationById(id: string) {
  return prisma.conversation.findUnique({
    where: { id },
    include: { messages: true },
  });
}

export async function listConversations() {
  return prisma.conversation.findMany({
    orderBy: { updatedAt: "desc" },
  });
}
