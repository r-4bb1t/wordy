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
    <div className="w-full h-full flex flex-col items-center px-6 py-12 md:px-12">
      <ul className="w-full py-2 gap-4 md:gap-2 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 mt-12">
        {articles.map((article, i) => (
          <li className="w-full" key={i}>
            <Link
              href={`/article/${article.id}`}
              className="flex group w-full flex-col h-full overflow-hidden border-t-4 border-t-black"
            >
              <div className="w-full h-32 overflow-hidden shrink-0">
                <img
                  src={article.image}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                />
              </div>
              <div className="p-4 group-hover:bg-base-200/80 transition-all h-28 flex flex-col justify-between bg-base-200">
                <div className="line-clamp-2 w-full font-bold break-all h-full">
                  {article.title}
                </div>
                <div className="font-light opacity-80 shrink-0 flex justify-between items-center text-sm">
                  <div>@{article.author}</div>
                  <div>
                    {isValid(new Date(article.createdAt!)) &&
                      formatDistanceToNow(new Date(article.createdAt!), {
                        locale: ko,
                        addSuffix: true,
                      })}
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
