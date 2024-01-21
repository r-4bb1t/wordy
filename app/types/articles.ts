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
  url: string;
  author: string;
  category: CategoryType;
}

export type CategoryType =
  | "tech"
  | "health"
  | "business"
  | "science"
  | "sports"
  | "entertainment"
  | "art";

export const CATEGORY_LIST: CategoryType[] = [
  "tech",
  "health",
  "business",
  "science",
  "sports",
  "entertainment",
  "art",
];