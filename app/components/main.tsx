"use client";

import Header from "./header";
import Result from "./result";
import Input from "./input";
import { useState } from "react";
import { DEFAULT_ARTICLE } from "../constants/default";
import { WordType } from "../types/result";

export default function Main() {
  const [en, setEn] = useState(DEFAULT_ARTICLE);
  const [ko, setKo] = useState("");
  const [words, setWords] = useState<WordType[]>([]);

  return (
    <main className="flex flex-col items-center w-full gap-8 px-4 py-12">
      <Header />
      <Input setWords={setWords} en={en} setEn={setEn} setKo={setKo} />
      {words.length > 0 && (
        <Result words={words} en={en} ko={ko} setKo={setKo} />
      )}
    </main>
  );
}
