import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 w-full flex items-center py-4 justify-between px-6 md:px-12 bg-black z-10">
      <Link href={"/"} className="text-white font-black">
        wordy
      </Link>
    </header>
  );
}
