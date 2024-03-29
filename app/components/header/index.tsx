import Link from "next/link";
import HeaderButtons from "./buttons";
import { cookies } from "next/headers";

const getTheme = async () => {
  const theme = (cookies().get("theme")?.value || "light") as "light" | "dark";
  return { theme };
};

export default async function Header() {
  const { theme } = await getTheme();

  return (
    <header className="fixed top-0 w-screen inset-x-0 flex items-center h-16 justify-between px-6 md:px-12 z-10 print:hidden">
      <Link
        href={"/"}
        className="px-4 py-2 hover:bg-base-200 transition-colors normal-case text-lg font-black rounded-lg"
      >
        wordy
      </Link>

      <HeaderButtons theme={theme} />
    </header>
  );
}
