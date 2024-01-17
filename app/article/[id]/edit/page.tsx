import Edit from "@/app/components/edit";
import { ArticleType } from "@/app/types/articles";
import { Metadata, ResolvingMetadata } from "next";

const getData = async (id: string) => {
  try {
    const result = await fetch(`${process.env.APP_URL}/api/articles/${id}`, {
      cache: "no-cache",
    }).then((res) => res.json());
    if (!result.article) return null;
    return result.article as ArticleType;
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
    title: data?.title,
  };
}

export default async function Article({ params }: { params: { id: string } }) {
  const article = await getData(params.id);
  if (!article) throw new Error("Article not found");
  return <Edit defaultArticle={article} />;
}
