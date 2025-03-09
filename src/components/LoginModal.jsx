"use client";
import { useEffect } from "react";
import LoginForm from "./form/LoginForm";

const LoginModal = ({ user }) => {
  useEffect(() => {
    if (!user) document.getElementById("my_modal_5").showModal();
  }, []);

  return (
    <>
      <button
        onClick={() => document.getElementById("my_modal_5").showModal()}
      ></button>
      <dialog
        id="my_modal_5"
        className="modal modal-bottom sm:modal-middle backdrop-blur-[1px]"
      >
        <div className="modal-box flex flex-col justify-around items-center min-h-[calc(100vh-60%)]">
          <h3 className="font-bold text-3xl ">Let's Go!</h3>
          <LoginForm />
        </div>
      </dialog>
    </>
  );
};

export default LoginModal;
