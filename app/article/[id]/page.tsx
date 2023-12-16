import Main from "@/app/components/main";
import Sidebar from "@/app/components/sidebar";
import { ArticleType } from "@/app/types/articles";
import { redirect } from "next/navigation";

const getData = async (id: string) => {
  const result = await fetch(`${process.env.APP_URL}/api/articles/${id}`).then(
    (res) => res.json()
  );
  if (!result.article) return null;
  return {
    ...result.article,
    words: JSON.parse(result.article.words),
    quizzes: JSON.parse(result.article.quizzes),
  } as ArticleType;
};

export default async function Home({
  params: { id },
}: {
  params: { id: string };
}) {
  const article = await getData(id);
  if (!article) redirect("/");
  return (
    <div className="flex">
      <Sidebar />
      <Main defaultArticle={article} />
    </div>
  );
}
