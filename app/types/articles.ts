import { QuizType, WordType } from "./result";

export interface ArticleType {
  title: string;
  image: string;
  id: string | null;
  en: string;
  ko: string;
  words: WordType[];
  quizzes: QuizType[];
  createdAt: string | null;
}
