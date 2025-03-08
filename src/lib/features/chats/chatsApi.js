const { default: axios } = require("axios");

const getChats = async (email, chatId) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/prompts?email=${email}&chatId=${chatId}`
    );
    return data.data;
  } catch (error) {
    console.log("chatsFetchError:", error.message);
  }
};

export default getChats;
