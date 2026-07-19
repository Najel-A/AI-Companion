import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = import.meta.env.VITE_API_URL ?? "";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      // Future auth token can be attached here.
      return headers;
    },
  }),
  tagTypes: ["Conversation", "ConversationDetail", "Memory", "Project"],
  endpoints: () => ({}),
});
