import { configureStore } from "@reduxjs/toolkit";
import chatsReducer from "./features/chats/chatsSlice";
import historyReducer from "./features/history/historySlice";
import newChatReducer from "./features/newChat/newChatSlice";
export const store = configureStore({
  reducer: {
    chats: chatsReducer,
    history: historyReducer,
    newChat: newChatReducer,
  },
});
