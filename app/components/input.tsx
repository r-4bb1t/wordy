"use client";

import { useCallback, useState } from "react";

import MDEditor from "@uiw/react-md-editor";
import { WordType } from "../types/result";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { DEFAULT_ARTICLE } from "../constants/default";

export default function Input({
  setWords,
}: {
  setWords: React.Dispatch<React.SetStateAction<WordType[]>>;
}) {
  const [en, setEn] = useState(DEFAULT_ARTICLE);
  const [kor, setKor] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = useCallback(async () => {
    setLoading(true);
    try {
      const translateResult = await fetch("/api/papago", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: en }),
      });
      const { message } = await translateResult.json();
      setKor(message.result.translatedText);

      const wordsResult = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ article: en }),
      });
      setWords(await wordsResult.json());
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }, [en, setWords]);

  return (
    <div className="w-full flex flex-col max-w-5xl items-center gap-8 px-4">
      <div className="w-full border border-primary rounded-xl overflow-hidden">
        <MDEditor
          value={en}
          // @ts-ignore
          onChange={setEn}
          preview="live"
          visibleDragbar={false}
          height={300}
          className="w-full text-sm"
        />
      </div>
      <button
        onClick={() => handleTranslate()}
        className="btn btn-primary"
        disabled={loading}
      >
        {loading ? <div className="loading loading-dots" /> : "Make!"}
      </button>
    </div>
  );
}
