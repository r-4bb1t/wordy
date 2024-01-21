"use client";

import SignIn from "../sign-in";
import Modal from "../modal";
import Darkmode from "./darkmode";
import { useUserStore } from "@/app/store/user-store";
import { useEffect, useState } from "react";
import UserButton from "./user-button";
import { auth } from "@/app/lib/firebase/client";
import { convertUserType } from "@/app/utils/convert-user-type";

export default function HeaderButtons({ theme }: { theme: "light" | "dark" }) {
  const [isOpenedSignIn, setIsOpenedSignIn] = useState(false);
  const { user, setUser } = useUserStore();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((rawUserData) => {
      if (rawUserData) {
        setUser(convertUserType(rawUserData));
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex items-center gap-4">
      <Darkmode theme={theme} />
      {user ? (
        <UserButton user={user} />
      ) : (
        <button
          className="px-4 py-2 hover:bg-base-200 transition-colors normal-case font-black"
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
