"use client";

import { useState } from "react";
import Result from "./components/result";
import Input from "./components/input";
import { WordType } from "./types/result";

export default function Home() {
  const [words, setWords] = useState<WordType[]>([]);

  return (
    <main className="flex flex-col gap-8 items-center py-12">
      <h1 className="text-4xl font-black">
        영어 <span className="text-primary">아티클</span> 읽자
      </h1>
      <Input setWords={setWords} />
      <Result words={words} />
    </main>
  );
}
