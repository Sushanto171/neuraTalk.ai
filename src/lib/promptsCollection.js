import { db } from "./mongoDBConnection";

export const promptsCollection = () => {
  const collection = db.collection("prompts");
  return collection;
};
