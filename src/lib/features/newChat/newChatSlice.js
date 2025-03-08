import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  newChat: false,
};
const newChatSlice = createSlice({
  name: "newChat",
  initialState,
  reducers: {
    setNewChat: (state) => {
      state.newChat = true;
    },
    resetNewChat: (state) => {
      state.newChat = false;
    },
  },
});

export const { setNewChat, resetNewChat } = newChatSlice.actions;
export default newChatSlice.reducer;
