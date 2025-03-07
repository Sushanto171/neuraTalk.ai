"use server";

import { signIn } from "@/lib/authOptions";

export async function doSocial(formData) {
  const action = formData?.action;

  const response = await signIn(action, { redirectTo: "/" });

  console.log({ response });
}
