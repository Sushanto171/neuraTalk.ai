"use server";
import { signIn } from "@/lib/authOptions";

export async function doSocial(formData) {
  const action = formData.get("action");
  await signIn(action, { redirectTo: "/" });
}
