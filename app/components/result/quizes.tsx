import { QuizType } from "@/app/types/result";

export default function quizzes({ quizzes }: { quizzes: QuizType[] }) {
  return (
    <ol className="w-full max-w-5xl p-12 flex flex-col gap-2 text-sm border-primary border rounded-xl bg-white">
      {quizzes.map((quiz, i) => (
        <li key={i} className="flex flex-col">
          <div className="font-bold">
            {i + 1}. {quiz.quiz}
          </div>
          <ol className="flex gap-2 list-decimal list-inside">
            {quiz.options.map((option, j) => (
              <li key={j} className="font-medium">
                {option}
              </li>
            ))}
          </ol>
          <div className="text-xs mt-4">{quiz.answer}</div>
        </li>
      ))}
    </ol>
  );
}
