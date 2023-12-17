"use client";

import { useCallback, useState } from "react";
import { QuizType, WordType } from "../../types/result";
import Article from "./article";
import Quizzes from "./quizzes";
import Words from "./words";
import { useRouter } from "next/navigation";

export default function Result({
  id,
  words,
  quizzes,
  en,
  ko,
  setKo,
}: {
  id?: string;
  words: WordType[];
  quizzes: QuizType[];
  en: string;
  ko: string;
  setKo: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSave = useCallback(async () => {
    setLoading(true);
    try {
      if (id) {
        const result = await fetch(`/api/article/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            en,
            ko,
            words,
            quizzes,
          }),
        });
      } else {
        const result = await fetch(`/api/articles`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            en,
            ko,
            words,
            quizzes,
          }),
        });
        // router.push(`/article/${(await result.json()).id}`);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [en, id, ko, quizzes, router, words]);
  return (
    <div className="w-full flex flex-col items-center gap-8">
      <Words words={words} />
      <Article en={en} ko={ko} words={words.map((w) => w.word)} setKo={setKo} />
      <Quizzes quizzes={quizzes} />
      <button
        className="btn btn-primary"
        onClick={() => handleSave()}
        disabled={loading}
      >
        {loading ? <div className="loading loading-dots" /> : "저장"}
      </button>
    </div>
  );
}
