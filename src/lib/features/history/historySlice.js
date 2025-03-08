const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  chatId: "",
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setChatId: (state, action) => {
      state.chatId = action.payload;
    },
    resetChatId: (state) => {
      state.chatId = "";
    },
  },
});

export const { setChatId, resetChatId } = historySlice.actions;

export default historySlice.reducer;
