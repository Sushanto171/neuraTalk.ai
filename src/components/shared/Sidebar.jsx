"use client";
import Link from "next/link";
import { useState } from "react";
import Toggle from "../sidbar/Toggle";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`relative transition duration-500 ${isOpen ? "w-64" : "w-0"}`}
    >
      {/* Sidebar */}
      <div
        className={`h-[calc(100vh-58px)] fixed overflow-y-auto w-64 bg-gray-200 p-4 transition duration-500 ${
          isOpen ? "translate-x-0" : " -translate-x-64"
        }`}
      >
        This is side bar
        <ul className="mt-8 space-y-2">
          <li>
            <Link href={"/"}>New Chat</Link>
          </li>
          <li>
            <Link href={"/"}>History</Link>
          </li>
          <li>
            <Link href={"/"}>Support</Link>
          </li>
        </ul>
      </div>

      {/* Toggle Button (14px Right from Sidebar) */}
      <div
        className={`fixed top-15 transition-all duration-500 ${
          isOpen ? "left-[256px]" : "left-0.5"
        }`}
      >
        <Toggle onOpen={setIsOpen} />
      </div>
    </div>
  );
};

export default Sidebar;
