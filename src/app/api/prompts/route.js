import { generateTextEcoGPT } from "@/lib/echoGPTConnection";
import { generateText } from "@/lib/geminiConnection";
import { promptsCollection } from "@/lib/promptsCollection";
const collection = promptsCollection();
export const GET = async (req) => {
  try {
    // get user email
    const email = req.nextUrl.searchParams.get("email");
    const chatId = req.nextUrl.searchParams.get("chatId");
    // console.log({ email, chatId });

    let chats;
    if ((email, chatId)) {
      chats = await collection.findOne({ email, chatId });
    }
    if (email && !chatId) {
      const result = await collection.find({ email }).toArray();
      chats = result[result.length - 1];
    }
    // get prompt

    return Response.json({
      message: "Success",
      status: 200,
      data: chats ? chats : {},
    });

    // return Response.json({ message: "Success", status: 200, data });
  } catch (error) {
    // console.log(error);
    return Response.json({
      message: "internal server error",
      error: error.message,
    });
  }
};

export const POST = async (req) => {
  try {
    const { prompt, email, chatId, engine } = await req.json();
    // console.log({ prompt });
    // validation
    if (!email || !prompt) {
      return Response.json({
        message: "email or prompt invalid, please try again",
        status: 404,
      });
    }

    // get content
    let response;
    if (engine === "gemini") {
      response = await generateText(JSON.stringify(prompt));
    }

    // echo gpt
    if (engine === "echoGpt") {
      response = await generateTextEcoGPT(JSON.stringify(prompt));
    }
    const userQuery = prompt[prompt.length - 1]?.content || "";
    // mongodb data
    const dbData = {
      prompt: userQuery || prompt,
      response,
      createAt: new Date(),
    };

    const existingChat = await collection.findOne({ email, chatId });
    let result;
    if (existingChat) {
      result = await collection.updateOne(
        { email, chatId },
        { $push: { prompts: dbData } },
        { upsert: true }
      );
    } else {
      result = await collection.insertOne({
        email,
        createAt: new Date(),
        chatId: chatId.toString(),
        prompts: [dbData],
      });
    }

    return Response.json({ message: "success", data: { chatId } });
  } catch (error) {
    // console.log(error.message);
  }
};
