import LoginForm from "@/components/form/LoginForm";
import UserProfile from "@/components/UserProfile";
import { auth } from "@/lib/authOptions";

export default async function Home() {
  const session = await auth();
  console.log(session);
  return (
    <div>
      <h1>NeuraTalk.ai</h1>
      <p>AI-powered smart chat assistant</p>
      <UserProfile />
      <LoginForm />
    </div>
  );
}
