import { getChats } from "./chatsApi";

const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit");

const initialState = {
  chats: [],
  chatId: "",
  isLoading: false,
  isError: true,
  error: null,
};

export const fetchChats = createAsyncThunk("chats/fetchChats", async (data) => {
  const { email, chatId } = data;
  const result = await getChats(email, chatId);
  return result;
});

const chatsSlice = createSlice({
  name: "chats",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchChats.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.isLoading = false;
      state.chats = action?.payload?.prompts || [];
      state.chatId = action?.payload?.chatId || "";
    });
    builder.addCase(fetchChats.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.error?.message;
    });
  },
});

export default chatsSlice.reducer;
