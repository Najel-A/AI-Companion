import { api } from "../../services/api";
import type { Conversation, Message } from "./types";

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    listConversations: builder.query<Conversation[], void>({
      query: () => "/api/conversations",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Conversation" as const, id })),
              { type: "Conversation", id: "LIST" },
            ]
          : [{ type: "Conversation", id: "LIST" }],
    }),
    getConversation: builder.query<Conversation, string>({
      query: (id) => `/api/conversations/${id}`,
      providesTags: (_result, _error, id) => [
        { type: "ConversationDetail", id },
      ],
    }),
    createConversation: builder.mutation<Conversation, { title: string }>({
      query: (body) => ({
        url: "/api/conversations",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Conversation", id: "LIST" }],
    }),
    deleteConversation: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/conversations/${id}`,
        method: "DELETE",
        responseHandler: async (response) => {
          if (response.status === 204) return undefined;
          return response.json();
        },
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "Conversation", id: "LIST" },
        { type: "ConversationDetail", id },
      ],
    }),
    addMessage: builder.mutation<
      Message,
      { conversationId: string; role: string; content: string }
    >({
      query: ({ conversationId, role, content }) => ({
        url: `/api/conversations/${conversationId}/messages`,
        method: "POST",
        body: { role, content },
      }),
      invalidatesTags: (_result, _error, { conversationId }) => [
        { type: "ConversationDetail", id: conversationId },
        { type: "Conversation", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useListConversationsQuery,
  useGetConversationQuery,
  useCreateConversationMutation,
  useDeleteConversationMutation,
  useAddMessageMutation,
} = chatApi;
