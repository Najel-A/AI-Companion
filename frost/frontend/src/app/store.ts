import { configureStore } from "@reduxjs/toolkit";
import { api } from "../services/api";
import chatReducer from "../features/chat/chatSlice";
import "../features/chat/chatApi";
import "../features/memories/memoryApi";
import "../features/projects/projectApi";

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
