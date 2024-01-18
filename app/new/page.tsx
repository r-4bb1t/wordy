import Edit from "../components/edit";
import { DEFAULT_ARTICLE } from "../constants/default";

export default function Home() {
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
    />
  );
}
