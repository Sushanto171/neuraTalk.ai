const { default: axios } = require("axios");

export const getChats = async (email, chatId) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/prompts?email=${email}&chatId=${chatId}`
    );
    return data.data;
  } catch (error) {
    console.log("chatsFetchError:", error.message);
  }
};

export const addChats = async (data) => {
  try {
    const { data: result } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/prompts`,
      data
    );
    return result?.data;
  } catch (error) {
    console.log("ChatsPostError:", error.message);
  }
};
