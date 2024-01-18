"use client";

import { useCallback } from "react";
import { ArticleType } from "../../types/articles";
import "github-markdown-css";
import { emphasize } from "../../utils/emphasize";
import Showdown from "showdown";
import Quizzes from "./quizzes";
import Words from "./words";
import { IoIosLink } from "react-icons/io";
import Link from "next/link";

export default function View({ article }: { article: ArticleType }) {
  const { title, en, ko, words, quizzes, author, url } = article;
  const converter = new Showdown.Converter(),
    text = emphasize(en, words),
    english = converter.makeHtml(text).replace(/<h1.*?>.*?<\/h1>/g, ""),
    korean = converter.makeHtml(ko).replace(/<h1.*?>.*?<\/h1>/g, "");

  return (
    <main className="flex flex-col items-center w-full gap-8 px-4 py-12 md:py-20 print:p-0 overflow-x-hidden">
      <div className="w-full flex flex-col items-center bg-base-100 max-w-5xl print:max-w-none">
        <div className="p-6 flex flex-col items-center">
          <div className="mb-2 capitalize font-black text-lg">
            {article.category}
          </div>
          <div className="text-3xl font-black text-center px-0 md:px-12 lg:px-24">
            {title}
          </div>
          <Link
            href={url}
            target="_blank"
            className="mt-2 text-base-content/80 flex items-center gap-2"
          >
            {author}
            <IoIosLink />
          </Link>
          <div className="w-12 h-0.5 my-4 bg-primary" />
        </div>
        <div className="w-full h-52 overflow-hidden rounded-xl">
          <img
            src={article.image}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div className="w-full text-2xl font-bold text-primary border-l-4 border-l-primary pl-4 my-10">
          Words in contents
        </div>
        <Words words={words} />
        <div className="w-full text-2xl font-bold text-primary my-10 border-l-4 border-l-primary pl-4">
          Contents
        </div>
        <div className="w-full text-3xl font-black mb-4">{title}</div>
        <div
          className="leading-loose print:leading-relaxed markdown-body !bg-base-100 !text-base-content"
          dangerouslySetInnerHTML={{ __html: english }}
        />
        <div
          className="markdown-body markdown-body-sm p-4 !bg-base-200 w-full !text-base-content"
          dangerouslySetInnerHTML={{ __html: korean }}
        />
        <div className="w-full text-2xl font-bold text-primary my-10 border-l-4 border-l-primary pl-4">
          Quiz
        </div>
        <Quizzes quizzes={quizzes} />
      </div>
    </main>
  );
}
