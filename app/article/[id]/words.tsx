import { WordType } from "@/app/types/result";

export default function Words({ words }: { words: WordType[] }) {
  return (
    <ul className="w-full text-sm bg-white">
      {words.map((word, i) => (
        <li
          key={i}
          className="grid md:grid-cols-[200px_1fr] break-inside-avoid"
        >
          <div className="font-black text-primary text-xl flex md:items-center px-4 py-2 gap-4 border-t-4 border-t-primary !bg-base-200">
            {word.word}
            <div className="font-medium md:hidden">
              <span className="text-primary">
                {word.meaning.split(". ")[0] + ". "}
              </span>
              {word.meaning.split(". ")[1]}
            </div>
          </div>
          <div className="flex flex-col gap-1 px-4 border-t border-t-base-300 py-4 md:py-2">
            <div className="font-medium hidden md:block">
              <span className="text-primary">
                {word.meaning.split(". ")[0] + ". "}
              </span>
              {word.meaning.split(". ")[1]}
            </div>
            <div className="text-xs font-medium">
              {word.exampleSentence.sentence}
            </div>
            <div className="text-xs">{word.exampleSentence.meaning}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
