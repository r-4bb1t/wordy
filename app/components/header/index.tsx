import Link from "next/link";
import { auth } from "../../auth";
import HeaderButtons from "./buttons";
import { cookies } from "next/headers";

const getTheme = async () => {
  const theme = cookies().get("theme")?.value || "light";
  return theme as "light" | "dark";
};

export default async function Header() {
  const session = await auth();
  const theme = await getTheme();

  return (
    <header className="fixed top-0 w-screen inset-x-0 flex items-center h-16 justify-between px-6 md:px-12 z-10 print:hidden">
      <Link href={"/"} className="btn btn-ghost normal-case text-lg font-black">
        wordy
      </Link>

      <HeaderButtons user={session?.user} theme={theme} />
    </header>
  );
}