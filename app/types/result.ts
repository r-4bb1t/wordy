import { ArticleType } from "./articles";

export interface WordType {
  word: string;
  meaning: string;
  exampleSentence: {
    sentence: string;
    meaning: string;
  }[];
  isLiked: boolean;
  articles?: Partial<ArticleType>[];
}

export interface QuizType {
  quiz: string;
  options: string[];
  answer: string;
}

export interface ResultType {
  words: WordType[];
  quizzes: QuizType[];
}
