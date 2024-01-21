import { WordType } from "@/app/types/result";
import { Fragment } from "react";

export default function Words({ words }: { words: WordType[] }) {
  return (
    <ul className="w-full max-w-5xl columns-2 text-sm bg-base-100">
      {words.map((word, i) => (
        <li key={i} className="flex flex-col mb-2 break-inside-avoid-column">
          <div className="font-bold">
            {word.word}
            <span className="font-medium ml-2">{word.meaning}</span>
          </div>
          {word.exampleSentence.map((e, i) => (
            <Fragment key={i}>
              <div className="text-xs font-medium">{e.sentence}</div>
              <div className="text-xs opacity-80">{e.meaning}</div>
            </Fragment>
          ))}
        </li>
      ))}
    </ul>
  );
}
