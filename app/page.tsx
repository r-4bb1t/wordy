import { ArticleType } from "@/app/types/articles";
import ArticleCard from "./article-card";

const getData = async () => {
  try {
    const { articles } = await fetch(`${process.env.APP_URL}/api/articles`, {
      cache: "no-store",
    }).then((res) => res.json());
    return articles as ArticleType[];
  } catch (e) {
    return [];
  }
};

export default async function Home() {
  const articles = await getData();

  return (
    <div className="w-full h-full flex flex-col items-center px-6 md:px-12">
      <ul className="w-full pt-2 pb-12 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {articles.map((article, i) => (
          <li className="w-full" key={i}>
            <ArticleCard article={article} />
          </li>
        ))}
      </ul>
    </div>
  );
}
