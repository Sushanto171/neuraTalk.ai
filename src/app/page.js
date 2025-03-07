import LoginForm from "@/components/form/LoginForm";
import PromptInput from "@/components/form/PromptInput";
import UserProfile from "@/components/UserProfile";
import { auth } from "@/lib/authOptions";

export default async function Home() {
  const session = await auth();

  return (
    <div>
      <h1>NeuraTalk.ai</h1>
      <p>AI-powered smart chat assistant</p>
      {session ? (
        <>
          <UserProfile />
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
