import Main from "./components/main";
import Sidebar from "./components/sidebar";
import { DEFAULT_ARTICLE } from "./constants/default";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <Main
        defaultArticle={{
          id: undefined,
          en: DEFAULT_ARTICLE,
          ko: "",
          words: [],
          quizzes: [],
        }}
      />
    </div>
  );
}
