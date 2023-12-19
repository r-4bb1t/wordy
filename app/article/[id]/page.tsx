import Main from "@/app/components/main";
import { ArticleType } from "@/app/types/articles";
import { Metadata, ResolvingMetadata } from "next";

const getData = async (id: string) => {
  try {
    const result = await fetch(`${process.env.APP_URL}/api/articles/${id}`, {
      cache: "no-cache",
    }).then((res) => res.json());
    if (!result.article) return null;
    return {
      ...result.article,
      words: JSON.parse(result.article.words),
      quizzes: JSON.parse(result.article.quizzes),
    } as ArticleType;
  } catch (e) {
    console.log(e);
    return null;
  }
};

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const data = await getData(params.id);

  return {
    title: data?.en.split("\n")[0].replace(/#/g, "") || "wordy-smoky",
  };
}

export default async function Home({ params }: { params: { id: string } }) {
  const article = await getData(params.id);
  if (!article) throw new Error("Article not found");
  return <Main defaultArticle={article} />;
}
