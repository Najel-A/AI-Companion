import { api } from "../../services/api";
import type { Memory } from "./types";

type MemorySearchResponse = {
  status: string;
  message: string;
  results: Memory[];
};

export const memoryApi = api.injectEndpoints({
  endpoints: (builder) => ({
    searchMemories: builder.query<MemorySearchResponse, string>({
      query: (q) => `/api/memory/search?q=${encodeURIComponent(q)}`,
      providesTags: ["Memory"],
    }),
  }),
});

export const { useSearchMemoriesQuery, useLazySearchMemoriesQuery } = memoryApi;
