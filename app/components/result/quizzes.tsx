import { QuizType } from "@/app/types/result";

export default function Quizzes({ quizzes }: { quizzes: QuizType[] }) {
  return (
    <ol className="w-full max-w-5xl p-12 flex flex-col gap-4 text-sm border-primary border rounded-xl bg-white">
      {quizzes.map((quiz, i) => (
        <li key={i} className="flex flex-col gap-3">
          <div className="font-bold">
            <span className="font-black text-primary">Q.</span> {quiz.quiz}
          </div>
          <ol className="flex flex-col gap-2 list-decimal list-inside">
            {quiz.options.map((option, j) => (
              <li key={j} className="font-medium">
                {option}
              </li>
            ))}
          </ol>
          <div className="text-xs w-full text-right">
            <span className="font-medium text-primary">A.</span> {quiz.answer}
          </div>
        </li>
      ))}
    </ol>
  );
}
