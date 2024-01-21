import Edit from "@/app/components/edit";
import { ArticleType } from "@/app/types/articles";
import { createToken } from "@/app/utils/create-token";
import { Metadata, ResolvingMetadata } from "next";
import { cookies } from "next/headers";

const getData = async (id: string) => {
  try {
    const userId = cookies().get("wordy-user")?.value || "";
    const token = createToken(userId);
    const result = await fetch(`${process.env.APP_URL}/api/articles/${id}`, {
      headers: {
        credentials: "include",
        authorization: `Bearer ${token}`,
      },
      cache: "no-cache",
    }).then((res) => res.json());
    if (!result.article) throw new Error("Article not found");
    return { article: result.article, token } as {
      article: ArticleType;
      token: string;
    };
  } catch (e) {
    console.log(e);
    return { article: null, token: "" };
  }
};

export async function generateMetadata(
  { params }: { params: { id: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const data = await getData(params.id);

  return {
    title: data?.article?.title,
  };
}

export default async function Article({ params }: { params: { id: string } }) {
  const { article, token } = await getData(params.id);
  if (!article) throw new Error("Article not found");
  return <Edit defaultArticle={article} token={token} />;
}
