"use client";

import { useCallback, useRef, useState } from "react";
import { QuizType, WordType } from "../../types/result";
import Article from "./article";
import Quizzes from "./quizzes";
import Words from "./words";
import { useRouter } from "next/navigation";
import { makePDF } from "@/app/utils/makePDF";
import { revalidateTag } from "next/cache";

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
  const page = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handlePDF = useCallback(async () => {
    makePDF({
      id: null,
      en,
      ko,
      words,
      quizzes,
    });
  }, [en, ko, quizzes, words]);

  const handleSave = useCallback(async () => {
    setLoading(true);
    try {
      if (id) {
        await fetch(`/api/articles/${id}`, {
          method: "PATCH",
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
        router.push(`/article/${(await result.json()).id}`);
      }
    } catch (e) {
      revalidateTag("articles");
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [en, id, ko, quizzes, router, words]);
  return (
    <div className="w-full flex flex-col items-center gap-8">
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
      <div className="flex gap-2">
        <button
          className="btn btn-primary"
          onClick={() => handleSave()}
          disabled={loading}
        >
          {loading ? <div className="loading loading-dots" /> : "저장"}
        </button>
        <button
          className="btn btn-primary btn-outline"
          onClick={() => {
            handlePDF();
          }}
        >
          PDF 다운로드
        </button>
      </div>
    </div>
  );
}
