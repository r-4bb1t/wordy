"use client";

import { WordType } from "@/app/types/result";
import { IoChevronDown, IoHeart, IoHeartOutline } from "react-icons/io5";

export default function Words({ words }: { words: WordType[] }) {
  const handleLike = async (word: WordType) => {
    await fetch(`/api/word/${word.word}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        credentials: "include",
      },
      body: JSON.stringify({ isLiked: word.isLiked }),
    });
  };

  return (
    <ul className="w-full text-sm bg-base-100 grid md:grid-cols-2">
      {words.map((word, i) => (
        <li key={i}>
          <label className="flex flex-col break-inside-avoid divide-y cursor-pointer md:cursor-auto">
            <div className="flex justify-between w-full px-4 py-2 items-center gap-4">
              <label className="hover:scale-110 transition-transform swap">
                <input
                  type="checkbox"
                  className="hidden"
                  id={`word-${i}`}
                  defaultChecked={word.isLiked}
                  onChange={() => {
                    handleLike(word);
                  }}
                />
                <IoHeart size={20} className="fill-primary swap-on" />
                <IoHeartOutline size={20} className="fill-primary swap-off" />
              </label>
              <div className="w-full font-black text-primary text-base flex flex-col md:flex-row md:gap-4">
                <div>{word.word}</div>
                <div className="font-medium text-base">
                  <span className="text-primary">
                    {word.meaning.split(". ")[0] + ". "}
                  </span>
                  {word.meaning.split(". ")[1]}
                </div>
              </div>
              <div className="md:hidden">
                <IoChevronDown />
              </div>
            </div>
            <input className="peer hidden" type="checkbox" id={`word-${i}`} />
            <div className="border-t border-t-base-300 justify-center overflow-hidden h-full max-h-0 peer-checked:max-h-[500px] md:!max-h-[500px] transition-all">
              <div className="flex flex-col gap-1 py-3 px-4">
                <div className="font-medium">
                  {word.exampleSentence.sentence}
                </div>
                <div className="opacity-80">{word.exampleSentence.meaning}</div>
              </div>
            </div>
          </label>
        </li>
      ))}
    </ul>
  );
}
