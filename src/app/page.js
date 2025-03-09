import PromptInput from "@/components/form/PromptInput";

export default async function Home() {
  return (
    <div className="h-[calc(100vh-100px)] flex flex-col ">

          {/* Prompt input */}
          <PromptInput />
    </div>
  );
}
