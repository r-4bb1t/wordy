import { QuizType } from "@/app/types/result";
import Item from "./item";

export default function Quizzes({ quizzes }: { quizzes: QuizType[] }) {
  return (
    <ol className="w-full max-w-5xl flex flex-col gap-4 text-sm">
      {quizzes.map((quiz, i) => (
        <li key={i}>
          <Item quiz={quiz} />
        </li>
      ))}
    </ol>
  );
}
