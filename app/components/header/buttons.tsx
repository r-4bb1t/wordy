"use client";

import { useEffect, useState } from "react";
import { IoPersonCircleOutline } from "react-icons/io5";
import SignIn from "../sign-in";
import Modal from "../modal";
import { toggle } from "./action";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/app/lib/firebase/client";

const greet = () => {
  const hour = new Date().getHours();
  if (hour >= 4 && hour <= 11) return "Good Morning";
  if (hour >= 12 && hour <= 17) return "Good Afternoon";
  return "Good Evening";
};

export default function HeaderButtons({ theme }: { theme: "light" | "dark" }) {
  const [isOpenedSignIn, setIsOpenedSignIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (!user) {
        setUser(null);
        return;
      }
      setUser(authUser);
    });
  }, [user]);

  return (
    <div className="flex items-center gap-2">
      <input
        type="checkbox"
        className="toggle toggle-sm !transition-all"
        checked={theme === "dark"}
        onChange={async () => toggle()}
      />
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
        <SignIn close={() => setIsOpenedSignIn(false)} />
      </Modal>
    </div>
  );
}
