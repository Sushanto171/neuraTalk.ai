"use server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// initialize

const genAi = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
export const generateText = async (prompt) => {
  const result = await model.generateContent(prompt);
  const response =
    result.response?.candidates[0]?.content?.parts[0]?.text ||
    "No response content found.";
  console.log(response);
  return response;
};
