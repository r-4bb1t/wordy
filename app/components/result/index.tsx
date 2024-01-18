"use client";

import { useRef, useState } from "react";
import { QuizType, WordType } from "../../types/result";
import Article from "./article";
import Quizzes from "./quizzes";
import Words from "./words";
import { useRouter } from "next/navigation";

export default function Result({
  words,
  quizzes,
  en,
  ko,
  setKo,
}: {
  words: WordType[];
  quizzes: QuizType[];
  en: string;
  ko: string;
  setKo: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [loading, setLoading] = useState(false);
  const page = useRef<HTMLDivElement>(null);

  const router = useRouter();
  return (
    <>
      <div className="w-full flex flex-col items-center gap-8" ref={page}>
        <Words words={words} />
        <Article
          en={en}
          ko={ko}
          words={words.map((w) => w.word)}
          setKo={setKo}
        />
        <Quizzes quizzes={quizzes} />
      </div>
    </>
  );
}
