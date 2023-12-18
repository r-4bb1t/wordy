"use client";

import Header from "./header";
import Result from "./result";
import Input from "./input";
import { useState } from "react";
import { QuizType, WordType } from "../types/result";
import { ArticleType } from "../types/articles";

export default function Main({
  defaultArticle,
}: {
  defaultArticle: ArticleType;
}) {
  const [en, setEn] = useState(defaultArticle.en);
  const [ko, setKo] = useState(defaultArticle.ko);
  const [words, setWords] = useState<WordType[]>(defaultArticle.words);
  const [quizzes, setquizzes] = useState<QuizType[]>(defaultArticle.quizzes);

  return (
    <main className="flex flex-col items-center w-full gap-8 px-4 py-12 bg-base-200">
      <Header />
      <Input
        setWords={setWords}
        en={en}
        setEn={setEn}
        setKo={setKo}
        setquizzes={setquizzes}
      />
      {words.length > 0 && (
        <Result
          id={defaultArticle.id}
          words={words}
          quizzes={quizzes}
          en={en}
          ko={ko}
          setKo={setKo}
        />
      )}
    </main>
  );
}
