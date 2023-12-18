import { QuizType, WordType } from "./result";

export interface ArticleType {
  id?: string;
  en: string;
  ko: string;
  words: WordType[];
  quizzes: QuizType[];
  createdAt?: string;
}
