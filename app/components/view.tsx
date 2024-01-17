"use client";

import { useCallback } from "react";
import { ArticleType } from "../types/articles";
import "github-markdown-css";
import { emphasize } from "../utils/emphasize";
import Showdown from "showdown";

export default function View({ article }: { article: ArticleType }) {
  const { title, en, ko, words, quizzes } = article;
  const converter = new Showdown.Converter(),
    text = emphasize(
      en,
      words.map((w) => w.word)
    ),
    english = converter.makeHtml(text).replace(/<h1.*?>.*?<\/h1>/g, ""),
    korean = converter.makeHtml(ko).replace(/<h1.*?>.*?<\/h1>/g, "");

  const handlePDF = useCallback(async () => {
    window.print();
  }, []);

  return (
    <main className="flex flex-col items-center w-full gap-8 px-4 py-12 print:p-0">
      <div className="w-full flex flex-col items-center !bg-white max-w-5xl print:max-w-none">
        <div className="w-full text-3xl font-black before:content-['#'] before:mr-1 before:text-primary">
          {title}
        </div>
        <div className="w-full text-2xl font-bold text-primary border-l-4 border-l-primary pl-4 my-6">
          Words in contents
        </div>
        <ul className="w-full text-sm rounded-xl bg-white">
          {words.map((word, i) => (
            <li
              key={i}
              className="grid grid-cols-[200px_1fr] break-inside-avoid"
            >
              <div className="font-black text-primary text-xl flex items-center px-4 py-2 border-t-4 border-t-primary !bg-base-200">
                {word.word}
              </div>
              <div className="flex flex-col gap-1 px-4 py-2 border-t border-t-base-300">
                <div className="font-medium">
                  <span className="text-primary">
                    {word.meaning.split(". ")[0] + ". "}
                  </span>
                  {word.meaning.split(". ")[1]}
                </div>
                <div className="text-xs font-medium">
                  {word.exampleSentence.sentence}
                </div>
                <div className="text-xs">{word.exampleSentence.meaning}</div>
              </div>
            </li>
          ))}
        </ul>
        <div className="w-full text-2xl font-bold text-primary my-6 border-l-4 border-l-primary pl-4">
          Contents
        </div>
        <div className="w-full text-2xl font-black mb-4 before:content-['#'] before:mr-1 before:text-primary">
          {title}
        </div>
        <div
          className="leading-loose print:leading-relaxed markdown-body"
          dangerouslySetInnerHTML={{ __html: english }}
        />
        <div
          className="markdown-body markdown-body-sm p-4 !bg-base-200 w-full"
          dangerouslySetInnerHTML={{ __html: korean }}
        />
        <div className="w-full text-2xl font-bold text-primary my-6 border-l-4 border-l-primary pl-4">
          Quiz
        </div>
        <ol className="w-full max-w-5xl p-12 flex flex-col gap-4 text-sm border-primary border rounded-xl bg-white">
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
                <span className="font-medium text-primary">A.</span>{" "}
                {quiz.answer}
              </div>
            </li>
          ))}
        </ol>
      </div>
      <button
        className="btn btn-primary btn-outline print:hidden"
        onClick={() => {
          handlePDF();
        }}
      >
        PDF 다운로드
      </button>
    </main>
  );
}
