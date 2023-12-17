import Main from "./components/main";
import { DEFAULT_ARTICLE } from "./constants/default";

export default function Home() {
  return (
    <Main
      defaultArticle={{
        id: undefined,
        en: DEFAULT_ARTICLE,
        ko: "",
        words: [],
        quizzes: [],
        createdAt: new Date().toISOString(),
      }}
    />
  );
}
