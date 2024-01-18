"use client";

import Result from "./result";
import Input from "./input";
import { useCallback, useState } from "react";
import { QuizType, WordType } from "../types/result";
import { ArticleType } from "../types/articles";
import { useRouter } from "next/navigation";

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
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSave = useCallback(async () => {
    setLoading(true);
    try {
      if (defaultArticle.id) {
        await fetch(`/api/articles/${defaultArticle.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            image,
            en,
            ko,
            words,
            quizzes,
          }),
        });
        router.replace(`/article/${defaultArticle.id}`);
      } else {
        const result = await fetch(`/api/articles`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            image,
            en,
            ko,
            words,
            quizzes,
          }),
        });
        router.push(`/article/${(await result.json()).id}`);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [en, ko, quizzes, router, words]);

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

      <div className="w-full flex flex-col items-center gap-8">
        {words.length > 0 && (
          <Result
            words={words}
            quizzes={quizzes}
            en={en}
            ko={ko}
            setKo={setKo}
          />
        )}
        <button
          className="btn btn-primary"
          onClick={() => handleSave()}
          disabled={loading}
        >
          {loading ? <div className="loading loading-dots" /> : "저장"}
        </button>
      </div>
    </main>
  );
}
