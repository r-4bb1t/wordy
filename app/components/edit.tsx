"use client";

import Result from "./result";
import Input from "./input";
import { useCallback, useState } from "react";
import { ArticleType } from "../types/articles";
import { useRouter } from "next/navigation";
import { createToken } from "../utils/create-token";
import { useUserStore } from "../store/user-store";

export default function Edit({
  defaultArticle,
}: {
  defaultArticle: ArticleType;
}) {
  const [article, setArticle] = useState<ArticleType>(defaultArticle);
  const [loading, setLoading] = useState(false);
  const { user } = useUserStore();

  const router = useRouter();

  const handleSave = useCallback(async () => {
    setLoading(true);
    if (!user) {
      alert("로그인이 필요합니다.");
      return;
    }
    try {
      if (defaultArticle.id) {
        const result = await fetch(`/api/articles/${defaultArticle.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${createToken(user!.id)}`,
          },
          body: JSON.stringify(article),
          cache: "no-store",
        });
        const json = await result.json();
        if (json.error) throw new Error(json.error);
        router.push(`/article/${defaultArticle.id}`);
      } else {
        const result = await fetch(`/api/articles`, {
          method: "POST",
          headers: {
            authorization: `Bearer ${createToken(user!.id)}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(article),
          cache: "no-store",
        });
        const json = await result.json();
        if (json.error) throw new Error(json.error);
        router.push(`/article/${json.id}`);
      }
    } catch (e) {
      alert(e);
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
                <div className="loading loading-spinner loading-sm" />
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
