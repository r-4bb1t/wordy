import Link from "next/link";
import { formatDistanceToNow, isValid } from "date-fns";
import { ko } from "date-fns/locale";
import { ArticleType } from "./types/articles";
import markdownToTxt from "markdown-to-txt";

export default function ArticleCard({ article }: { article: ArticleType }) {
  const plain = markdownToTxt(article.en);

  return (
    <Link
      href={`/article/${article.id}`}
      className="flex group w-full h-full overflow-hidden hover:bg-base-200/80 p-4 rounded-xl"
    >
      <div className="w-24 h-24 md:w-32 md:h-32 overflow-hidden shrink-0 rounded-xl">
        <img
          src={article.image}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300 "
        />
      </div>
      <div className="px-4 py-0.5 transition-all flex flex-col justify-between h-full">
        <div>
          <div className="line-clamp-3 w-full font-bold break-all">
            {article.title}
          </div>
          <div className="hidden md:line-clamp-2 opacity-80 text-sm mt-1">
            {plain}
          </div>
        </div>
        <div className="font-light opacity-80 shrink-0 text-xs">
          <div>
            @{article.author} |{" "}
            {isValid(new Date(article.createdAt!)) &&
              formatDistanceToNow(new Date(article.createdAt!), {
                locale: ko,
                addSuffix: true,
              })}
          </div>
        </div>
      </div>
    </Link>
  );
}
