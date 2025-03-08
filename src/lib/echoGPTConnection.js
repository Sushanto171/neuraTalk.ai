import axios from "axios";

export const generateTextEcoGPT = async (prompt) => {
  try {
    const { data } = await axios.post(
      "https://api.echogpt.live/v1/chat/completions",
      {
        messages: [{ role: "system", content: prompt }],
        model: "EchoGPT",
      },
      {
        headers: { "x-api-key": process.env.ECHOGPT_API_KEY },
      }
    );

    const res = data.choices[0].message.content || "No response content found.";
    return res;
  } catch (error) {
    const res = "No response content found.";
    return res;
  }
};
