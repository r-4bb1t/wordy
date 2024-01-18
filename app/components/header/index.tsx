import Link from "next/link";
import { auth } from "../../auth";
import HeaderButtons from "./buttons";

export default async function Header() {
  const session = await auth();
  return (
    <header className="fixed top-0 w-screen inset-x-0 flex items-center h-16 justify-between px-6 md:px-12 z-10 print:hidden">
      <Link
        href={"/"}
        className="btn btn-ghost btn normal-case text-lg font-black"
      >
        wordy
      </Link>

      <HeaderButtons user={session?.user} />
    </header>
  );
}
