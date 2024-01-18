import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 w-screen inset-x-0 flex items-center h-14 justify-between px-6 md:px-12 bg-black z-10 print:hidden">
      <Link href={"/"} className="text-white font-black">
        wordy
      </Link>
    </header>
  );
}
