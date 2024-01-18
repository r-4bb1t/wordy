"use client";

import { useCallback } from "react";
import { ArticleType } from "../../types/articles";
import "github-markdown-css";
import { emphasize } from "../../utils/emphasize";
import Showdown from "showdown";
import Quizzes from "./quizzes";
import Words from "./words";

export default function View({ article }: { article: ArticleType }) {
  const { title, en, ko, words, quizzes } = article;
  const converter = new Showdown.Converter(),
    text = emphasize(en, words),
    english = converter.makeHtml(text).replace(/<h1.*?>.*?<\/h1>/g, ""),
    korean = converter.makeHtml(ko).replace(/<h1.*?>.*?<\/h1>/g, "");

  const handlePDF = useCallback(async () => {
    window.print();
  }, []);

  return (
    <main className="flex flex-col items-center w-full gap-8 px-4 py-16 md:py-24 print:p-0 overflow-x-hidden">
      <div className="w-full flex flex-col items-center !bg-white max-w-5xl print:max-w-none">
        <div className="p-6 flex flex-col items-center">
          <div className="w-16 h-1 mb-4 bg-primary" />
          <div className="text-3xl font-black text-center px-0 md:px-12 lg:px-24">
            {title}
          </div>
        </div>
        <div className="w-full h-48 overflow-hidden">
          <img src={article.image} className="w-full h-full object-cover" />
        </div>
        <div className="w-full text-2xl font-bold text-primary border-l-4 border-l-primary pl-4 my-10">
          Words in contents
        </div>
        <Words words={words} />
        <div className="w-full text-2xl font-bold text-primary my-10 border-l-4 border-l-primary pl-4">
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
        <div className="w-full text-2xl font-bold text-primary my-10 border-l-4 border-l-primary pl-4">
          Quiz
        </div>
        <Quizzes quizzes={quizzes} />
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
