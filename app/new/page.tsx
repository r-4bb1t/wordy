import { cookies } from "next/headers";
import Edit from "../components/edit";
import { DEFAULT_ARTICLE } from "../constants/default";
import { createToken } from "../utils/create-token";

const getData = async () => {
  const userId = cookies().get("wordy-user")?.value || "";
  const token = createToken(userId);

  return { token };
};

export default async function New() {
  const { token } = await getData();
  return (
    <Edit
      defaultArticle={{
        title: "",
        image: "https://via.placeholder.com/900?text=cover+image",
        id: null,
        en: DEFAULT_ARTICLE,
        ko: "",
        words: [],
        quizzes: [],
        createdAt: null,
        author: "",
        category: "tech",
        url: "",
      }}
      token={token}
    />
  );
}
