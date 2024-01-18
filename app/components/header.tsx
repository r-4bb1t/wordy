import Link from "next/link";
import { IoPersonCircleOutline } from "react-icons/io5";

export default function Header() {
  return (
    <header className="fixed top-0 w-screen inset-x-0 flex items-center h-16 justify-between px-6 md:px-12 z-10 print:hidden">
      <Link
        href={"/"}
        className="btn btn-ghost btn-sm normal-case text-lg font-black"
      >
        wordy
      </Link>

      <button className="btn btn-ghost btn-circle">
        <IoPersonCircleOutline size={24} />
      </button>
    </header>
  );
}
