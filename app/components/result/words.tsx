import { WordType } from "@/app/types/result";

export default function Words({ words }: { words: WordType[] }) {
  return (
    <ul className="w-full max-w-5xl p-12 grid grid-cols-2 gap-2 text-sm border-primary border rounded-xl bg-white">
      {words.map((word, i) => (
        <li key={i} className="flex flex-col">
          <div className="font-bold">
            {word.word}
            <span className="font-medium ml-2">{word.meaning}</span>
          </div>
          <div className="text-xs font-medium">
            {word.exampleSentence.sentence}
          </div>
          <div className="text-xs">{word.exampleSentence.meaning}</div>
        </li>
      ))}
    </ul>
  );
}
