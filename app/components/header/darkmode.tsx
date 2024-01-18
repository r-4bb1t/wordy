"use client";

import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { toggle } from "./action";

export default function Darkmode({ theme }: { theme: "light" | "dark" }) {
  return (
    <div className="flex items-center gap-2">
      <div className="swap swap-rotate pointer-events-none">
        <input type="checkbox" checked={theme === "dark"} />
        <IoMoonOutline className="swap-on" />
        <IoSunnyOutline className="swap-off" />
      </div>
      <input
        type="checkbox"
        className="toggle toggle-sm !transition-all"
        checked={theme === "dark"}
        onChange={async () => toggle()}
      />
    </div>
  );
}
