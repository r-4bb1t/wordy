"use client";

import { IoPersonCircleOutline } from "react-icons/io5";
import SignIn from "../sign-in";
import Modal from "../modal";
import Darkmode from "./darkmode";
import { useUserStore } from "@/app/store/user-store";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/lib/firebase/client";

const greet = () => {
  const hour = new Date().getHours();
  if (hour >= 4 && hour <= 11) return "Good Morning";
  if (hour >= 12 && hour <= 17) return "Good Afternoon";
  return "Good Evening";
};

export default function HeaderButtons({ theme }: { theme: "light" | "dark" }) {
  const [isOpenedSignIn, setIsOpenedSignIn] = useState(false);
  const { user, setUser } = useUserStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, [setUser]);

  return (
    <div className="flex items-center gap-2">
      <Darkmode theme={theme} />
      {user ? (
        <button className="btn btn-ghost normal-case font-medium gap-0 pointer-events-none">
          <div className="hidden md:block">
            {greet()},
            <span className="ml-1 !font-black">{user.displayName}</span>
          </div>
          <div className="w-6 h-6 overflow-hidden rounded-full ml-2">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                className="w-full h-full object-cover"
                alt="user profile"
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
        <SignIn close={() => setIsOpenedSignIn(false)} />
      </Modal>
    </div>
  );
}
