"use client";
import { addChats } from "@/lib/features/chats/chatsApi";
import { fetchChats } from "@/lib/features/chats/chatsSlice";
import { resetNewChat, setNewChat } from "@/lib/features/newChat/newChatSlice";
import toast from "daisyui/components/toast";
import { AudioLines, CirclePlus, Mic, Send } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContentArea from "../ContentArea";

const PromptInput = () => {
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);
  const session = useSession();
  const dispatch = useDispatch();
  const { newChat } = useSelector((state) => state.newChat);
  const { chats, chatId: existChatId } = useSelector((state) => state.chats);
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

  const handleSend = async () => {
    if (!session?.data?.user?.email) return toast.error("User is not exist");
    if (input.trim()) {
      // console.log("User Input:", input);
      const data = {
        prompt: input,
        email: session.data.user.email,
        chatId: chatId ? chatId : new Date().getTime(),
        engine,
      };
      const result = await addChats(data);
      setChatId(result.chatId);
      console.log(result);
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

  return (
    <div className="flex-1 justify-center w-full max-w-2xl mx-auto flex flex-col gap-10">
      {/* content area */}
      <div
        className={`overflow-y-auto ${newChat ? "" : "h-[calc(100vh-220px)]"} ${
          chats.length > 0 && !newChat ? "h-[calc(100vh-220px)]" : ""
        }`}
      >
        <ContentArea isNewChat={newChat} />
      </div>
      {/* input area */}
      <div className="flex items-start border border-gray-300 rounded-xl p-2 shadow-md bg-white w-full max-w-2xl mx-auto">
        {/* add new chat  */}
        <div>
          <button
            onClick={() => {
              setChatId(""), dispatch(setNewChat());
            }}
          >
            <CirclePlus />
          </button>

          <select
            onChange={(e) => setEngine(e.target.value)}
            value={engine}
            className="select"
          >
            <option value={"echoGpt"}>EchoGPT</option>
            <option value={"gemini"}>Gemini</option>
          </select>
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 outline-none p-2 text-gray-700 resize-none"
          rows={2}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <button
          onClick={toggleListening}
          className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition mx-1"
        >
          {listening ? <AudioLines size={20} /> : <Mic size={20} />}
        </button>
        <button
          onClick={handleSend}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg transition"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default PromptInput;
