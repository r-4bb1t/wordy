import { WordType } from "../../types/result";
import Article from "./article";
import Words from "./words";

export default function Result({
  words,
  en,
  ko,
}: {
  words: WordType[];
  en: string;
  ko: string;
}) {
  return (
    <div className="w-full flex flex-col items-center">
      <Words words={words} />
      <Article en={en} ko={ko} />
    </div>
  );
}
