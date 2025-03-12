"use client";
import { setNewChat } from "@/lib/features/newChat/newChatSlice";
import { HelpCircle, Menu, Plus } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import History from "../sidbar/History";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div
      className={`fixed sm:relative transition duration-500 z-20 ${
        isOpen ? "w-64" : "w-0"
      }`}
    >
      {/* Sidebar */}
      <div
        className={`h-[calc(100vh-58px)] fixed overflow-y-auto w-64 bg-gray-200 dark:bg-gray-900 p-4 transition duration-500 ${
          isOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        <div className="flex flex-col justify-between h-full">
          <ul className="mt-8 space-y-4">
            <li>
              <button
                className="flex items-center gap-3 cursor-pointer px-4 py-2 w-full rounded-md shadow-xl bg-blue-500  text-white transition-all hover:bg-blue-600"
                onClick={() => {
                  dispatch(setNewChat()), router.push("/");
                }}
              >
                <Plus size={20} /> <span>New Chat</span>
              </button>
            </li>
            <li>
              <History />
            </li>
            <li>
              <Link
                href="/support"
                className="flex items-center gap-3 px-4 py-2 w-full rounded-md transition-all hover:bg-gray-300"
              >
                <HelpCircle size={20} /> <span>Support</span>
              </Link>
            </li>
          </ul>
          <div className="text-center text-sm text-gray-500">Powered by Ai</div>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-3 sm:top-[66px] transition-all border sm:border-none border-white duration-500 cursor-pointer ${
          isOpen ? "sm:left-[210px] left-1" : " left-1"
        } bg-gray-400 text-white p-2 scale-70 sm:scale-90 md:scale-100 rounded-full shadow-md hover:bg-gray-700`}
      >
        <Menu size={24} />
      </button>
    </div>
  );
};

export default Sidebar;
