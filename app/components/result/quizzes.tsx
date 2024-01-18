import { QuizType } from "@/app/types/result";

export default function Quizzes({ quizzes }: { quizzes: QuizType[] }) {
  return (
    <ol className="w-full max-w-5xl p-12 flex flex-col gap-4 text-sm border-primary border bg-base-100">
      {quizzes.map((quiz, i) => (
        <li key={i} className="flex flex-col gap-3">
          <div className="font-bold">
            <span className="font-black text-primary">Q.</span> {quiz.quiz}
          </div>
          <ul className="flex flex-col gap-2 list-disc list-inside">
            {quiz.options.map((option, j) => (
              <li key={j} className="font-medium">
                {option}
              </li>
            ))}
          </ul>
          <div className="text-xs w-full text-right">
            <span className="font-medium text-primary">A.</span> {quiz.answer}
          </div>
        </li>
      ))}
    </ol>
  );
}
