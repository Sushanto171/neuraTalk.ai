import { generateText } from "@/lib/geminiConnection";

export const GET = async (req) => {
  const prompt = req.nextUrl.searchParams.get("prompt");
  const result = await generateText(prompt);

  return Response.json({ message: "Success", status: 200, data: result });
};
