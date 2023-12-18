import Link from "next/link";
import { ArticleType } from "../types/articles";
import { formatDistanceToNow } from "date-fns";
import { ko } from "date-fns/locale";

const getData = async () => {
  const { articles } = await fetch(`${process.env.APP_URL}/api/articles`).then(
    (res) => res.json()
  );
  return articles as ArticleType[];
};

export default async function Sidebar() {
  const articles = await getData();

  return (
    <aside className="w-80 h-screen bg-white sticky top-0 border-l border-l-primary">
      <ul className="w-full p-4 flex flex-col gap-2">
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
                {formatDistanceToNow(new Date(article.createdAt!), {
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
