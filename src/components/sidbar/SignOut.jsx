"use client";
import { signOut } from "next-auth/react";
const SignOut = () => {
  return (
    <div>
      <button
        onClick={() => signOut()}
        className="border p-1 rounded-md cursor-pointer"
      >
        Sing Out
      </button>
    </div>
  );
};

export default SignOut;
