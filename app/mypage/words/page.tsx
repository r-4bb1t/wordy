import Words from "./words";
import { WordType } from "@/app/types/result";
import { createToken } from "@/app/utils/create-token";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const getData = async () => {
  try {
    const userId = cookies().get("wordy-user")?.value || "";
    const token = createToken(userId);

    const res = await fetch(`${process.env.APP_URL}/api/mypage/words`, {
      cache: "no-store",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((res) => res.json());
    if (res.error) {
      throw new Error(res.error);
    }
    return res.words as WordType[];
  } catch (e) {
    redirect("/");
  }
};

export default async function Home() {
  const words = await getData();

  return (
    <div className="w-full h-full flex flex-col items-center px-6 md:px-12">
      <Words words={words} />
    </div>
  );
}
