"use client";
import { fetchChats } from "@/lib/features/chats/chatsSlice";
import { getHistory } from "@/lib/features/history/historyApi";
import { resetNewChat } from "@/lib/features/newChat/newChatSlice";
import { MessageSquare } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const History = () => {
  const [history, setHistory] = useState([]);
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { newChat } = useSelector((state) => state.newChat);
  const [isActive, setActive] = useState("");

  useEffect(() => {
    if (!session?.data?.user?.email) return;
    fetchHistory();
  }, [session?.data?.user?.email, newChat]);

  //   fetch history data
  const fetchHistory = async () => {
    const email = session?.data?.user?.email;
    const result = await getHistory(email);

    setHistory(result?.data || []);
  };

  const handlerHistory = (chatId) => {
    // dispatch(setChatId(chatId));
    const refetch = {
      email: session?.data?.user?.email,
      chatId,
    };
    dispatch(resetNewChat());
    dispatch(fetchChats(refetch));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn flex justify-between w-full py-2 rounded-md shadow-md transition duration-300 transform hover:scale-105 "
      >
        <MessageSquare size={20} />
        <span className="flex-1 text-left gap-6">History</span>
      </button>
      <ul
        className={`overflow-y-auto transition-all transform-view duration-300 bg-white/40 p-1 rounded ${
          isOpen
            ? `max-h-[calc(100vh-400px)] ${
                history.length > 0 ? "min-h-20" : ""
              }`
            : "hidden h-0"
        } max-h-[500px] mt-4`}
      >
        {history.length > 0 ? (
          history.map((item) => (
            <li key={item._id} className="mb-2">
              <button
                onClick={() => {
                  handlerHistory(item.chatId), setActive(item._id);
                }}
                className={`cursor-pointer w-full py-2 px-4 ${
                  isActive === item._id ? "bg-white" : ""
                } rounded-md  transition-all truncate`}
              >
                {item.title}
              </button>
            </li>
          ))
        ) : (
          <li className="text-center text-gray-500">No history available</li>
        )}
      </ul>
    </div>
  );
};

export default History;
