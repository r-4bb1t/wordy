import { QuizType } from "@/app/types/result";

export default function Quizzes({ quizzes }: { quizzes: QuizType[] }) {
  return (
    <ol className="w-full max-w-5xl flex flex-col gap-4 text-sm">
      {quizzes.map((quiz, i) => (
        <li key={i} className="break-inside-avoid pb-6">
          <div className="font-bold mb-2">
            <span className="font-black text-primary">Q.</span> {quiz.quiz}
          </div>
          <ol className="flex flex-col gap-2 list-disc list-inside">
            {quiz.options.map((option, j) => (
              <li key={j} className="font-medium">
                {option}
              </li>
            ))}
          </ol>
          <div className="text-xs w-full text-right mt-2">
            <span className="font-medium text-primary">A.</span> {quiz.answer}
          </div>
        </li>
      ))}
    </ol>
  );
}
