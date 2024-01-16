import Link from "next/link";
import { ArticleType } from "../types/articles";
import { formatDistanceToNow, isValid } from "date-fns";
import { ko } from "date-fns/locale";

const getData = async () => {
  try {
    const { articles } = await fetch(`${process.env.APP_URL}/api/articles`, {
      next: { tags: ["articles"] },
    }).then((res) => res.json());
    return articles as ArticleType[];
  } catch (e) {
    return [];
  }
};

export default async function Sidebar() {
  const articles = await getData();

  return (
    <aside className="w-80 h-screen bg-white sticky top-0 border-r border-r-primary p-4">
      <h2 className="text-lg font-black border-b pb-2 flex justify-between w-full px-1">
        아티클 목록
        <Link href={"/"} className="btn btn-ghost btn-sm btn-circle">
          +
        </Link>
      </h2>
      <ul className="w-full py-2 flex flex-col gap-2">
        {articles.map((article, i) => (
          <li className="w-full" key={i}>
            <Link
              href={`/article/${article.id}`}
              className="btn btn-ghost text-left flex-nowrap justify-bewteen w-full"
            >
              <div className="line-clamp-1 w-full">
                {article.en.split("\n")[0].replace(/#/g, "")}
              </div>
              <div className="font-light text-gray-500 shrink-0">
                {isValid(new Date(article.createdAt!)) &&
                  formatDistanceToNow(new Date(article.createdAt!), {
                    locale: ko,
                    addSuffix: true,
                  })}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
