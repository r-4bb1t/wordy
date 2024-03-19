import { QuizType } from "@/app/types/result";
import cc from "classcat";
import { useState } from "react";
import { IoRefresh } from "react-icons/io5";

export default function Item({ quiz }: { quiz: QuizType }) {
  const [solved, setSolved] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="break-inside-avoid pb-6">
      <div className="font-bold mb-2">
        <span className="font-black text-primary">Q.</span> {quiz.quiz}
      </div>
      <div className="flex flex-col gap-2 list-disc list-inside">
        {quiz.options.map((option, j) => (
          <label
            key={j}
            className={cc([
              "font-medium flex items-center gap-2",
              solved &&
                (quiz.answer === option
                  ? "text-green-500"
                  : selected === j && "text-red-500"),
            ])}
          >
            <input
              name={quiz.quiz}
              onChange={(e) => setSelected(parseInt(e.target.value))}
              type="radio"
              className="radio radio-sm"
              value={`${j}`}
              checked={selected === j}
              disabled={solved}
            />
            {option}
          </label>
        ))}
      </div>
      <div className="flex gap-2 items-center mt-4">
        <button
          className="btn btn-primary btn-xs"
          onClick={() => setSolved(true)}
          disabled={solved || selected === null}
        >
          Submit
        </button>
        {solved && (
          <button
            className="btn btn-xs btn-circle btn-ghost"
            onClick={() => {
              setSolved(false);
              setSelected(null);
            }}
          >
            <IoRefresh size={12} />
          </button>
        )}
      </div>
    </div>
  );
}
