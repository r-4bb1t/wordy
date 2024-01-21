"use client";

import { WordType } from "@/app/types/result";
import Link from "next/link";
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
        <li key={i} className="flex flex-col justify-between">
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
            <div className="border-t justify-center overflow-hidden h-full max-h-0 peer-checked:max-h-[500px] md:!max-h-[500px] transition-all">
              {word.exampleSentence.map((e, i) => (
                <div className="flex flex-col gap-1 py-3 px-4" key={i}>
                  <div className="font-medium">{e.sentence}</div>
                  <div className="opacity-80">{e.meaning}</div>
                </div>
              ))}
            </div>
          </label>

          <div className="px-2 py-2">
            <div className="font-bold p-2">이 단어가 들어간 기사</div>
            <div className="grid grid-cols-4">
              {word.articles?.map((article, i) => (
                <Link
                  href={`/article/${article.id}`}
                  className="flex flex-col gap-2 p-2 rounded-xl group hover:bg-base-200 transition-colors"
                  key={`${article.title}-${i}`}
                >
                  <div className="rounded-xl overflow-hidden w-full h-16">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="px-1">
                    <div className="font-bold text-xs line-clamp-2 text-left">
                      {article.title}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
