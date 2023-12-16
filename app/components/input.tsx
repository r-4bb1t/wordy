"use client";

import { useCallback, useState } from "react";

import MDEditor from "@uiw/react-md-editor";
import { WordType } from "../types/result";

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { DEFAULT_ARTICLE } from "../constants/default";

export default function Input({
  setWords,
  en,
  setEn,
  setKo,
}: {
  setWords: React.Dispatch<React.SetStateAction<WordType[]>>;
  en: string;
  setEn: React.Dispatch<React.SetStateAction<string>>;
  setKo: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [loading, setLoading] = useState(false);

  const translate = useCallback(async () => {
    const translateResult = await fetch("/api/papago", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: en }),
    });
    const { message } = await translateResult.json();
    setKo(message.result.translatedText);
  }, [en, setKo]);

  const makeWords = useCallback(async () => {
    const wordsResult = await fetch("/api/openai", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ article: en }),
    });
    setWords(await wordsResult.json());
  }, [en, setWords]);

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
    <div className="w-full flex flex-col max-w-5xl items-center gap-8 px-4">
      <div className="w-full border border-primary rounded-xl overflow-hidden">
        <MDEditor
          value={en}
          // @ts-ignore
          onChange={setEn}
          preview="live"
          visibleDragbar={false}
          height={400}
          className="w-full text-sm"
          previewOptions={[]}
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
