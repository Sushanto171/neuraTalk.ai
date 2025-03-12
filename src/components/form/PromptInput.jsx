"use client";
import { addChats } from "@/lib/features/chats/chatsApi";
import { fetchChats } from "@/lib/features/chats/chatsSlice";
import { resetNewChat, setNewChat } from "@/lib/features/newChat/newChatSlice";

import { AudioLines, CirclePlus, Ellipsis, Mic, Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import ContentArea from "../ContentArea";

const PromptInput = () => {
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const session = useSession();
  const dispatch = useDispatch();
  const { newChat } = useSelector((state) => state.newChat);
  const [send, setSend] = useState(false);

  const {
    chats,
    chatId: existChatId,
    isLoading,
  } = useSelector((state) => state.chats);
  const [chatId, setChatId] = useState(existChatId || "");
  const [engine, setEngine] = useState("echoGpt");

  useEffect(() => {
    setChatId(existChatId);
  }, [existChatId]);

  useEffect(() => {
    // Check if the browser supports SpeechRecognition
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      toast.error("Browser does not support Speech Recognition");
      return;
    }
    // Create a new instance of speech recognition
    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInput(transcript);
    };

    recognitionRef.current.onerror = (event) => {
      toast.error("Speech recognition error", event);
      setListening(false);
    };
  }, []);
  const toggleListening = () => {
    if (!recognitionRef.current) return;
    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      recognitionRef.current.start();
      setListening(true);
    }
  };

  useEffect(() => {
    if (session?.data?.user) {
      const data = {
        email: session?.data?.user?.email,
        chatId,
      };

      dispatch(fetchChats(data));
    }
  }, [session?.data?.user]);

  useEffect(() => {
    if (newChat) {
      setChatId("");
    }
  }, [newChat]);

  const handleSend = async () => {
    if (!session?.data?.user?.email) {
      toast.error("User is not exist");
      return;
    }
    if (!input) {
      toast.error("No talking yet...!");
      return;
    }
    if (input.trim()) {
      setSend(true);

      // create new array previous chats wise
      let messages = newChat
        ? input
        : chats.flatMap((chat) => [
            { role: "user", content: chat.prompt },
            { role: "assistant", content: chat.response },
          ]);
      // instruction
      if (!newChat) {
        messages.unshift({
          role: "system",
          content:
            "If you need any information, you can use the data. Otherwise, respond based on the last (role: 'user') object and this response is straightforward.",
        });
        // user query
        messages.push({ role: "user", content: input });
      }

      // console.log("User Input:", input);
      const data = {
        prompt: messages || [],
        email: session.data.user.email,
        chatId: chatId ? chatId : new Date().getTime(),
        engine,
      };
      // post request
      const result = await addChats(data);
      setChatId(result.chatId);
      // console.log(result);
      setInput("");
      const refetch = {
        email: session?.data?.user?.email,
        chatId,
      };

      dispatch(fetchChats(refetch));
      setNewChat(false);
      dispatch(resetNewChat());
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setSend(false);
    }
  }, [isLoading]);

  return (
    <div className="flex-1 justify-center w-full max-w-2xl mx-auto flex flex-col gap-4">
      {/* content area */}
      <div
        className={`overflow-y-auto ${
          newChat || chats.length === 0 ? "h-fit" : "h-[calc(100vh-220px)]"
        }`}
      >
        <ContentArea loading={session?.status === ""} isNewChat={newChat} />
      </div>

      {/* input area */}
      <div className="w-full max-w-2xl mx-auto relative mb-10 sm:mb-0">
        {/* Input Box */}
        <div className="flex items-start border border-gray-300 dark:bg-gray-900 dark:border-gray-950 rounded-2xl p-3 pb-5 shadow-md bg-white w-full relative">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Let's start talking..."
            className="flex-1 outline-none p-2 text-gray-700 dark:text-white resize-none bg-transparent text-base"
            rows={2}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />

          {/* Voice & Send Buttons */}
          <div className="flex space-x-2">
            <button
              onClick={toggleListening}
              className="p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 rounded-lg transition"
            >
              {listening ? <AudioLines size={20} /> : <Mic size={20} />}
            </button>

            <button
              onClick={handleSend}
              className="p-2 bg-blue-500 cursor-pointer hover:bg-blue-600 text-white rounded-lg transition"
            >
              {send ? <Ellipsis size={20} /> : <Send size={20} />}
            </button>
          </div>
        </div>

        {/* New Chat + Select Option */}
        <div className="absolute bottom-[-2px] -left-4 flex items-center space-x-2 scale-[65%]">
          <button
            title="New Chat"
            onClick={() => dispatch(setNewChat())}
            className="p-1 rounded-lg transition cursor-pointer opacity-75"
          >
            <CirclePlus size={24} />
          </button>

          <select
            onChange={(e) => setEngine(e.target.value)}
            value={engine}
            className="border rounded-lg px-2 py-1 text-gray-700 dark:text-gray-100 cursor-pointer"
          >
            <option value="echoGpt">EchoGPT</option>
            <option value="gemini">Gemini</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PromptInput;
