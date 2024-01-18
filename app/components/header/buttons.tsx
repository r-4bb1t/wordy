"use client";

import { User } from "next-auth";
import { useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import SignIn from "../sign-in";
import Modal from "../modal";

const greet = () => {
  const hour = new Date().getHours();
  if (hour >= 4 && hour <= 11) return "Good Morning";
  if (hour >= 12 && hour <= 17) return "Good Afternoon";
  return "Good Evening";
};

export default function HeaderButtons({ user }: { user: User | undefined }) {
  const [isOpenedSignIn, setIsOpenedSignIn] = useState(false);

  return (
    <>
      {user ? (
        <button className="btn btn-ghost normal-case font-medium gap-0 pointer-events-none">
          {greet()},<span className="ml-1 !font-black">{user.name}</span>
          <div className="w-6 h-6 overflow-hidden rounded-full ml-2">
            {user.image ? (
              <img
                src={user.image}
                alt="user"
                className="w-full h-full object-cover"
              />
            ) : (
              <IoPersonCircleOutline size={24} />
            )}
          </div>
        </button>
      ) : (
        <button
          className="btn btn-ghost normal-case font-black"
          onClick={() => setIsOpenedSignIn(true)}
        >
          Login
        </button>
      )}
      <Modal opened={isOpenedSignIn} close={() => setIsOpenedSignIn(false)}>
        <SignIn />
      </Modal>
    </>
  );
}
