import { db } from "@/lib/mongoDBConnection";

export const checkAndSaveUser = async (user) => {
  try {
    const usersCollection = db.collection("users");

    // check if user already exists
    const isExist = await usersCollection.findOne({ email: user.email });
    if (isExist) {
      return true;
    }
    const result = await usersCollection.insertOne({
      name: user.name,
      email: user.email,
      image: user.image,
      createdAt: new Date(),
    });
    // console.log(result);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
