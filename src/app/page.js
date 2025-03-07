import LoginForm from "@/components/form/LoginForm";
import PromptInput from "@/components/form/PromptInput";
import { auth } from "@/lib/authOptions";

export default async function Home() {
  const session = await auth();

  return (
    <div className="h-[calc(100vh-100px)] flex flex-col ">
      {session ? (
        <>
          {/* Prompt input */}
          <PromptInput />
        </>
      ) : (
        <>
          <LoginForm />
        </>
      )}
    </div>
  );
}
