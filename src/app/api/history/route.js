import { auth } from "@/lib/authOptions";
import { promptsCollection } from "@/lib/promptsCollection";

const collection = promptsCollection();

export const GET = async (req) => {
  const session = await auth();
  const email = session.user.email;
  // console.log(session.user);

  const result = await collection
    .aggregate([
      {
        $match: { email },
      },
      {
        $project: {
          chatId: 1,
          createAt: 1,
          title: {
            $arrayElemAt: [
              { $map: { input: "$prompts", as: "item", in: "$$item.prompt" } },
              0,
            ],
          },
        },
      },
      {
        $sort: { chatId: -1 },
      },
    ])
    .toArray();

  return Response.json({ message: "success", data: result });
};
