"use client";
import { getHistory } from "@/lib/features/history/historyApi";
import { setChatId } from "@/lib/features/history/historySlice";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const History = () => {
  const [history, setHistory] = useState([]);
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!session?.data?.user?.email) return;
    fetchHistory();
  }, [session?.data?.user?.email]);

  //   fetch history data
  const fetchHistory = async () => {
    const email = session?.data?.user?.email;
    const result = await getHistory(email);

    setHistory(result?.data || []);
  };

  const handlerHistory = (chatId) => {
    dispatch(setChatId(chatId));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-primary w-full py-2 rounded-md shadow-md transition duration-300 transform hover:scale-105 hover:bg-blue-600"
      >
        History
      </button>
      <ul
        className={`overflow-y-auto transition-all transform-view duration-300 ${
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
                onClick={() => handlerHistory(item.chatId)}
                className="w-full py-2 px-4 bg-gray-100 rounded-md shadow-sm hover:bg-gray-200 transition-all truncate"
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
