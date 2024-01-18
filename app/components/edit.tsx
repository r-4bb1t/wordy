"use client";

import Result from "./result";
import Input from "./input";
import { useCallback, useState } from "react";
import { ArticleType } from "../types/articles";
import { useRouter } from "next/navigation";

export default function Edit({
  defaultArticle,
}: {
  defaultArticle: ArticleType;
}) {
  const [article, setArticle] = useState<ArticleType>(defaultArticle);
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
          body: JSON.stringify(article),
          cache: "no-store",
        });
        router.replace(`/article/${defaultArticle.id}`);
      } else {
        const result = await fetch(`/api/articles`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            credentials: "include",
          },
          body: JSON.stringify(article),
          cache: "no-store",
        });
        router.push(`/article/${(await result.json()).id}`);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [article, defaultArticle.id, router]);

  return (
    <main className="flex flex-col items-center w-full gap-8 px-4 py-12 md:py-20">
      <Input article={article} setArticle={setArticle} />

      {article.words.length > 0 && (
        <div className="w-full flex flex-col items-center gap-8">
          <Result article={article} setArticle={setArticle} />
          <button
            className="btn btn-primary"
            onClick={() => handleSave()}
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="loading loading-spinner" />
                저장
              </>
            ) : (
              "저장"
            )}
          </button>
        </div>
      )}
    </main>
  );
}
