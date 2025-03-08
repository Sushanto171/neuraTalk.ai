const { default: axios } = require("axios");

export const getHistory = async (email) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/history?email=${email}`
  );
  return data;
};
