import Main from "@/app/components/main";
import { ArticleType } from "@/app/types/articles";

const getData = async (id: string) => {
  const result = await fetch(`${process.env.APP_URL}/api/articles/${id}`, {
    cache: "no-cache",
  }).then((res) => res.json());
  console.log(result);
  if (!result.article) return null;
  return {
    ...result.article,
    words: JSON.parse(result.article.words),
    quizzes: JSON.parse(result.article.quizzes),
  } as ArticleType;
};

export default async function Home({ params }: { params: { id: string } }) {
  const article = await getData(params.id);
  if (!article) throw new Error("Article not found");
  return <Main defaultArticle={article} />;
}
