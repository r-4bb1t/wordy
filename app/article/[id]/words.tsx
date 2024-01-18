import { WordType } from "@/app/types/result";

export default function Words({ words }: { words: WordType[] }) {
  return (
    <ul className="w-full text-sm bg-base-100">
      {words.map((word, i) => (
        <li
          key={i}
          className="grid md:grid-cols-[250px_1fr] break-inside-avoid"
        >
          <div className="font-black text-primary text-base md:text-lg flex md:flex-col px-4 py-2 gap-4 md:gap-0 border-t-4 border-t-primary !bg-base-200">
            {word.word}
            <div className="font-medium text-base">
              <span className="text-primary">
                {word.meaning.split(". ")[0] + ". "}
              </span>
              {word.meaning.split(". ")[1]}
            </div>
          </div>
          <div className="flex flex-col gap-1 px-4 border-t border-t-base-300 py-3 md:py-2 justify-center">
            <div className="font-medium">{word.exampleSentence.sentence}</div>
            <div className="opacity-80">{word.exampleSentence.meaning}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}
