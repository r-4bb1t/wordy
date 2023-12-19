import Main from "./components/main";
import { DEFAULT_ARTICLE } from "./constants/default";

export default function Home() {
  return (
    <Main
      defaultArticle={{
        id: null,
        en: DEFAULT_ARTICLE,
        ko: "",
        words: [],
        quizzes: [],
        createdAt: null,
      }}
    />
  );
}
