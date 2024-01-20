export const PROMPT = `
1. Pick 20 difficult words and korean meaning (including part of speech), example sentence.
2. make just 3 quizzes about article.
Your response must be only JSON, and it must be like example JSON:

{
  words: [
    {
      word: "apple",
      meaning: "n. 사과",
      exampleSentence: {
          sentence: "I ate the apple.",
          meaning: "나는 사과를 먹었다."
      }
    },
  ],
  quizzes: [
      {
        quiz: "다음 중 글의 내용과 일치하는 것을 고르시오."
        options: [
          ""
        ],
        answer: ""
      }
  ]
}
`;

export interface ResponseType {
  words: {
    word: string;
    meaning: string;
    exampleSentence: {
      sentence: string;
      meaning: string;
    };
  }[];
  quizzes: {
    quiz: string;
    options: string[];
    answer: string;
  }[];
}