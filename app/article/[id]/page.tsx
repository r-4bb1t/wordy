import View from "@/app/article/[id]/view";
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
    openGraph: {
      images: [
        ...((await parent).openGraph?.images || []),
        {
          url: data?.image!,
          width: 1200,
          height: 630,
          alt: data?.title,
        },
      ],
    },
  };
}

export default async function Article({ params }: { params: { id: string } }) {
  const article = await getData(params.id);
  if (!article) throw new Error("Article not found");
  return <View article={article} />;
}
