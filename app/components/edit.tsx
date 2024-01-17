"use client";

import Result from "./result";
import Input from "./input";
import { useState } from "react";
import { QuizType, WordType } from "../types/result";
import { ArticleType } from "../types/articles";

export default function Edit({
  defaultArticle,
}: {
  defaultArticle: ArticleType;
}) {
  const [en, setEn] = useState(defaultArticle.en);
  const [ko, setKo] = useState(defaultArticle.ko);
  const [words, setWords] = useState<WordType[]>(defaultArticle.words);
  const [quizzes, setquizzes] = useState<QuizType[]>(defaultArticle.quizzes);
  const [title, setTitle] = useState(defaultArticle.title);
  const [image, setImage] = useState(defaultArticle.image);

  return (
    <main className="flex flex-col items-center w-full gap-8 px-4 py-12">
      <Input
        setWords={setWords}
        en={en}
        setEn={setEn}
        setKo={setKo}
        setquizzes={setquizzes}
        title={title}
        setTitle={setTitle}
        image={image}
        setImage={setImage}
      />
      {words.length > 0 && (
        <Result
          title={title}
          image={image}
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
