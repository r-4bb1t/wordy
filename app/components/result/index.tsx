"use client";

import { useRef } from "react";
import Article from "./article";
import Quizzes from "./quizzes";
import Words from "./words";
import { ArticleType } from "@/app/types/articles";

export default function Result({
  article,
  setArticle,
}: {
  article: ArticleType;
  setArticle: React.Dispatch<React.SetStateAction<ArticleType>>;
}) {
  const page = useRef<HTMLDivElement>(null);

  return (
    <>
      <div className="w-full flex flex-col items-center gap-8" ref={page}>
        <Words words={article.words} />
        <Article
          en={article.en}
          ko={article.ko}
          words={article.words.map((w) => w.word)}
          setKo={(ko) =>
            /* @ts-ignore */
            setArticle((article) => ({
              ...article,
              ko,
            }))
          }
        />
        <Quizzes quizzes={article.quizzes} />
      </div>
    </>
  );
}
