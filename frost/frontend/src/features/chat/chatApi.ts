import { api } from "../../services/api";
import type { Conversation, Message, SendMessageResponse } from "./types";

export const chatApi = api.injectEndpoints({
  endpoints: (builder) => ({
    // Get all conversations for the sidebar
    listConversations: builder.query<Conversation[], void>({
      query: () => "/api/conversations",

      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "Conversation" as const,
                id,
              })),
              { type: "Conversation" as const, id: "LIST" },
            ]
          : [{ type: "Conversation" as const, id: "LIST" }],
    }),

    // Get one conversation and its messages
    getConversation: builder.query<Conversation, string>({
      query: (id) => `/api/conversations/${id}`,

      providesTags: (_result, _error, id) => [
        {
          type: "ConversationDetail",
          id,
        },
      ],
    }),

    // Create a new conversation
    createConversation: builder.mutation<
      Conversation,
      { title: string }
    >({
      query: (body) => ({
        url: "/api/conversations",
        method: "POST",
        body,
      }),

      invalidatesTags: [
        {
          type: "Conversation",
          id: "LIST",
        },
      ],
    }),

    // Delete a conversation
    deleteConversation: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/conversations/${id}`,
        method: "DELETE",
        responseHandler: async (response) => {
          if (response.status === 204) {
            return undefined;
          }

          return response.json();
        },
      }),

      invalidatesTags: (_result, _error, id) => [
        {
          type: "Conversation",
          id: "LIST",
        },
        {
          type: "ConversationDetail",
          id,
        },
      ],
    }),

    // Send a complete conversational turn
    sendMessage: builder.mutation<
      SendMessageResponse,
      {
        conversationId: string;
        content: string;
      }
    >({
      query: ({ conversationId, content }) => ({
        url: `/api/conversations/${conversationId}/messages`,
        method: "POST",
        body: {
          role: "user",
          content,
        },
      }),

      // Immediately show the user's message while
      // the backend is waiting for Frost's response.
      async onQueryStarted(
        { conversationId, content },
        { dispatch, queryFulfilled }
      ) {
        const optimisticMessage: Message = {
          id: `optimistic-${crypto.randomUUID()}`,
          role: "user",
          content,
          createdAt: new Date().toISOString(),
        };

        const patchResult = dispatch(
          chatApi.util.updateQueryData(
            "getConversation",
            conversationId,
            (draft) => {
              draft.messages.push(optimisticMessage);
            }
          )
        );

        try {
          await queryFulfilled;
        } catch {
          // If the request fails, remove the optimistic message.
          patchResult.undo();
        }
      },

      // Once the backend finishes:
      // user message + assistant message are retrieved
      // from PostgreSQL and become the source of truth.
      invalidatesTags: (_result, _error, { conversationId }) => [
        {
          type: "ConversationDetail",
          id: conversationId,
        },
        {
          type: "Conversation",
          id: "LIST",
        },
      ],
    }),
  }),
});

export const {
  useListConversationsQuery,
  useGetConversationQuery,
  useCreateConversationMutation,
  useDeleteConversationMutation,
  useSendMessageMutation,
} = chatApi;