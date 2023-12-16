import { ArticleType } from "../types/articles";

const getData = async () => {
  const { articles } = await fetch(`${process.env.APP_URL}/api/articles`).then(
    (res) => res.json()
  );
  return articles as ArticleType[];
};

export default async function Sidebar() {
  const articles = await getData();

  return (
    <aside className="w-96 h-screen bg-white">
      <ul className="w-full p-4">
        {articles.map((article, i) => (
          <li
            className="w-full h-20 border border-primary rounded-xl p-4 mb-4"
            key={i}
          >
            <div className="text-xl font-bold">
              {article.contents.split("\n")[0]}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}
