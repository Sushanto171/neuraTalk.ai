import { auth } from "@/lib/authOptions";
import { generateText } from "@/lib/geminiConnection";
import { promptsCollection } from "@/lib/promptsCollection";
const collection = promptsCollection();
export const GET = async (req) => {
  try {
    // get user email
    const email = (await auth())?.user?.email;
    // get prompt
    return Response.json({ message: "Success", status: 200, data: [] });
    const prompt = req.nextUrl.searchParams.get("prompt");
    console.log(email);
    // validation
    if (!email || !prompt) {
      return Response.json({
        message: "email or prompt invalid, please try again",
        status: 404,
      });
    }
    // get content
    const response = await generateText(prompt);

    // add the prompt data to db
    const data = {
      email,
      prompt,
      response,
      createAt: new Date(),
    };
    await collection.insertOne(data);

    // return Response.json({ message: "Success", status: 200, data });
  } catch (error) {
    return Response.json({
      message: "internal server error",
      error: error.message,
    });
  }
};

export const POST = async (req) => {
  console.log(req);
  return Response.json({ message: "success" });
};
