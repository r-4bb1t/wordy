"use client";

import { useCallback, useState } from "react";

import MDEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { ArticleType, CATEGORY_LIST, CategoryType } from "../types/articles";

export default function Input({
  article,
  setArticle,
}: {
  article: ArticleType;
  setArticle: React.Dispatch<React.SetStateAction<ArticleType>>;
}) {
  const [loading, setLoading] = useState(false);

  const translate = useCallback(async () => {
    const translateResult = await fetch("/api/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: article.en }),
      cache: "no-store",
    });
    const { message } = await translateResult.json();
    setArticle((article) => ({ ...article, ko: message }));
  }, [article, setArticle]);

  const makeWords = useCallback(async () => {
    const wordsResult = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ article: article.en }),
      cache: "no-store",
    });
    const { words, quizzes } = await wordsResult.json();
    setArticle((article) => ({ ...article, words, quizzes }));
  }, [article, setArticle]);

  const makeResult = useCallback(async () => {
    setLoading(true);
    try {
      await Promise.all([translate(), makeWords()]);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [makeWords, translate]);

  return (
    <div className="w-full flex flex-col max-w-5xl items-center gap-4">
      <div className="w-full">
        <h1 className="text-lg font-bold mb-2">Category & Title</h1>
        <div className="grid grid-cols-[1fr_5fr] gap-4">
          <select
            className="select select-primary capitalize"
            value={article.category}
            onChange={(e) =>
              setArticle((article) => ({
                ...article,
                category: e.target.value as CategoryType,
              }))
            }
          >
            {CATEGORY_LIST.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <input
            className="input w-full input-primary font-bold"
            placeholder="title"
            value={article.title}
            onChange={(e) =>
              setArticle((article) => ({ ...article, title: e.target.value }))
            }
          />
        </div>
      </div>
      <div className="w-full">
        <h1 className="text-lg font-bold mb-2">Cover Image URL</h1>
        <input
          className="input w-full input-primary"
          placeholder="image"
          value={article.image}
          onChange={(e) =>
            setArticle((article) => ({ ...article, image: e.target.value }))
          }
        />
      </div>
      <div className="w-full">
        <h1 className="text-lg font-bold mb-2">Author & Original URL</h1>
        <div className="grid grid-cols-[1fr_2fr] gap-4">
          <input
            className="input w-full input-primary"
            placeholder="author"
            value={article.author}
            onChange={(e) =>
              setArticle((article) => ({ ...article, author: e.target.value }))
            }
          />
          <input
            className="input w-full input-primary"
            placeholder="url"
            value={article.url}
            onChange={(e) =>
              setArticle((article) => ({ ...article, url: e.target.value }))
            }
          />
        </div>
      </div>
      <div className="w-full h-64 overflow-hidden border-primary border">
        <img
          className="w-full h-full object-cover"
          src={article.image}
          alt=""
        />
      </div>
      <div className="w-full border border-primary overflow-hidden">
        <MDEditor
          value={article.en}
          onChange={(value) =>
            // @ts-ignore
            setArticle((article) => ({ ...article, en: value }))
          }
          preview="live"
          visibleDragbar={false}
          height={400}
          className="w-full text-sm"
        />
      </div>
      <button
        onClick={() => makeResult()}
        className="btn btn-primary"
        disabled={loading}
      >
        {loading ? <div className="loading loading-dots" /> : "Make!"}
      </button>
    </div>
  );
}
