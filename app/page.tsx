import Link from "next/link";
import { ArticleType } from "@/app/types/articles";
import { formatDistanceToNow, isValid } from "date-fns";
import { ko } from "date-fns/locale";
import Header from "./components/header";

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
    <div className="w-full h-screen bg-white flex flex-col items-center p-12">
      <Header />
      <ul className="w-full py-2 gap-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-12">
        {articles.map((article, i) => (
          <li className="w-full" key={i}>
            <Link
              href={`/article/${article.id}`}
              className="flex group w-full flex-col h-full rounded-xl overflow-hidden border bg-white"
            >
              <div className="w-full h-32 overflow-hidden shrink-0">
                <img
                  src={article.image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="p-4 group-hover:bg-black/5 transition-all h-full flex flex-col">
                <div className="line-clamp-2 w-full font-bold break-all h-full">
                  {article.title}
                </div>
                <div className="font-light text-gray-500 shrink-0 text-right">
                  {isValid(new Date(article.createdAt!)) &&
                    formatDistanceToNow(new Date(article.createdAt!), {
                      locale: ko,
                      addSuffix: true,
                    })}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
