"use client";

import { UserType } from "@/app/types/user";
import {
  IoListOutline,
  IoLogOutOutline,
  IoLogoGithub,
  IoNewspaperOutline,
  IoPersonCircleOutline,
} from "react-icons/io5";
import { signOut } from "@/app/lib/firebase/client";
import Link from "next/link";

const greet = () => {
  const hour = new Date().getHours();
  if (hour >= 4 && hour <= 11) return "Good Morning";
  if (hour >= 12 && hour <= 17) return "Good Afternoon";
  return "Good Evening";
};

export default function UserButton({ user }: { user: UserType }) {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="relative group">
      <button className="flex py-2 normal-case font-medium gap-0">
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

      <ul className="absolute rounded-xl scale-0 group-hover:scale-100 transition-transform w-max top-full right-0 bg-base-200 text-base-content origin-[calc(100%-16px)_0] py-2 px-4 flex flex-col gap-2">
        <li className="flex flex-col items-center py-2">
          <div className="w-6 h-6 overflow-hidden rounded-full">
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
          <div className="font-bold">{user.username}</div>
          <div className="text-xs text-base-content/40 flex items-center gap-1">
            {user.provider === "github.com" && <IoLogoGithub />}
            {user.email}
          </div>
        </li>
        <li className="grid grid-cols-2 gap-2 divide-x">
          <Link
            href={"/mypage/words"}
            className="btn btn-ghost btn-sm w-full rounded-lg h-auto flex flex-col py-2"
          >
            <IoListOutline size={24} />
            <div className="text-xs">단어장</div>
          </Link>
          <Link
            href={"/mypage/articles"}
            className="btn btn-ghost btn-sm w-full rounded-lg h-auto flex flex-col py-2"
          >
            <IoNewspaperOutline size={24} />
            <div className="text-xs">내 기사</div>
          </Link>
        </li>
        <hr />
        <li>
          <button
            className="btn btn-ghost btn-sm w-full rounded-lg"
            onClick={() => handleSignOut()}
          >
            Sign Out
            <IoLogOutOutline />
          </button>
        </li>
      </ul>
    </div>
  );
}
