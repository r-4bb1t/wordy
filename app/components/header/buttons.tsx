"use client";

import SignIn from "../sign-in";
import Modal from "../modal";
import Darkmode from "./darkmode";
import { useUserStore } from "@/app/store/user-store";
import { useState } from "react";
import UserButton from "./user-button";

export default function HeaderButtons({ theme }: { theme: "light" | "dark" }) {
  const [isOpenedSignIn, setIsOpenedSignIn] = useState(false);
  const { user } = useUserStore();

  return (
    <div className="flex items-center gap-4">
      <Darkmode theme={theme} />
      {user ? (
        <UserButton user={user} />
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
