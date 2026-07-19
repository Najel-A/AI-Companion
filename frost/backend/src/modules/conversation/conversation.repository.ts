import prisma from "../../config/prisma";

export async function create(title: string) {
  return prisma.conversation.create({
    data: { title },
  });
}

export async function findAll() {
  return prisma.conversation.findMany({
    orderBy: { updatedAt: "desc" },
  });
}

export async function findById(id: string) {
  return prisma.conversation.findUnique({
    where: { id },
    include: { messages: { orderBy: { createdAt: "asc" } } },
  });
}

export async function remove(id: string) {
  return prisma.conversation.delete({
    where: { id },
  });
}

export async function createMessage(
  conversationId: string,
  role: string,
  content: string
) {
  return prisma.message.create({
    data: { conversationId, role, content },
  });
}
