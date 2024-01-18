"use client";

import { UserType } from "@/app/types/user";
import {
  IoLogOut,
  IoLogOutOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { signOut } from "@/app/lib/firebase/client";

const greet = () => {
  const hour = new Date().getHours();
  if (hour >= 4 && hour <= 11) return "Good Morning";
  if (hour >= 12 && hour <= 17) return "Good Afternoon";
  return "Good Evening";
};

export default function UserButton({ user }: { user: UserType }) {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    await fetch("/api/auth/sign-out");
  };

  return (
    <div className="relative" onMouseLeave={() => setIsDropdownOpened(false)}>
      <button
        className="btn btn-ghost normal-case font-medium gap-0"
        onClick={() => setIsDropdownOpened((prev) => !prev)}
      >
        <div className="hidden md:block">
          {greet()},<span className="ml-1 !font-black">{user.username}</span>
        </div>
        <div className="w-6 h-6 overflow-hidden rounded-full ml-2">
          {user.image ? (
            <img
              src={user.image}
              className="w-full h-full object-cover"
              alt="user profile"
            />
          ) : (
            <IoPersonCircleOutline size={24} />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isDropdownOpened && (
          <motion.ul
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.1 }}
            className="absolute w-full top-full right-0 bg-base-100 text-base-content origin-top p-2 flex flex-col gap-2"
          >
            <li>
              <button
                className="btn btn-ghost btn-sm w-full"
                onClick={() => handleSignOut()}
              >
                Logout
                <IoLogOutOutline />
              </button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
