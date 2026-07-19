export type Message = {
  id: string;
  role: string;
  content: string;
  createdAt: string;
  conversationId: string;
};

export type Conversation = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages?: Message[];
};
