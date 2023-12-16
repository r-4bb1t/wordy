import { WordType } from "../../types/result";
import Words from "./words";

export default function Result({ words }: { words: WordType[] }) {
  return (
    <div className="w-full flex flex-col items-center">
      <Words words={words} />
    </div>
  );
}
