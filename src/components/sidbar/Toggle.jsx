"use client";
import { TbLayoutSidebarLeftCollapse } from "react-icons/tb";
const Toggle = ({ onOpen }) => {
  return (
    <>
      <div className="relative z-10 ">
        <button
          onClick={() => onOpen((prev) => !prev)}
          className="text-3xl cursor-pointer opacity-50 hover:opacity-80"
        >
          <TbLayoutSidebarLeftCollapse />
        </button>
      </div>
    </>
  );
};

export default Toggle;
