import { ArticleType } from "../types/articles";
import showdown from "showdown";
import { emphasize } from "@/app/utils/emphasize";
import "github-markdown-css";

export const makePDF = async (article: ArticleType) => {
  const { en, ko, words, quizzes } = article;
  const converter = new showdown.Converter(),
    text = emphasize(
      en,
      words.map((w) => w.word)
    ),
    titleText = en.split("\n")[0].replace(/#/g, ""),
    english = converter.makeHtml(text).replace(/<h1.*?>.*?<\/h1>/g, ""),
    korean = converter.makeHtml(ko).replace(/<h1.*?>.*?<\/h1>/g, "");

  const print = document.createElement("div");
  print.className = "w-full flex flex-col items-center !bg-white printable";

  const title = document.createElement("div");
  title.className =
    "w-full text-3xl font-black mb-8 before:content-['#'] before:mr-1 before:text-primary";
  title.innerText = titleText;

  const wordListTitle = document.createElement("div");
  wordListTitle.className = "w-full text-2xl font-bold text-primary mb-4";
  wordListTitle.innerText = "Words in contents";

  const wordlist = document.createElement("ul");
  wordlist.className = "w-full flex flex-col";
  words.forEach((w) => {
    const word = document.createElement("li");
    word.className = "grid grid-cols-[200px_1fr] break-inside-avoid";

    const wordTitle = document.createElement("div");
    wordTitle.className =
      "font-black text-primary text-xl flex items-center px-4 py-2 border-t-4 border-t-primary !bg-base-200";
    wordTitle.innerText = w.word;

    const explanation = document.createElement("div");
    explanation.className =
      "flex flex-col gap-1 px-4 py-2 border-t border-t-base-300";

    const wordMeaning = document.createElement("div");
    wordMeaning.className = "font-medium";

    const pos = document.createElement("span");
    pos.className = "text-primary font-medium";
    pos.innerText = w.meaning.split(". ")[0] + ". ";

    wordMeaning.appendChild(pos);
    wordMeaning.innerHTML += w.meaning.split(". ")[1];

    explanation.appendChild(wordMeaning);

    const sentence = document.createElement("div");
    sentence.className = "text-xs font-medium";
    sentence.innerText = w.exampleSentence.sentence;
    explanation.appendChild(sentence);

    const sentenceMeaning = document.createElement("div");
    sentenceMeaning.className = "text-xs";
    sentenceMeaning.innerText = w.exampleSentence.meaning;
    explanation.appendChild(sentenceMeaning);

    word.appendChild(wordTitle);
    word.appendChild(explanation);

    wordlist.appendChild(word);
  });

  const stitle1 = document.createElement("div");
  stitle1.className =
    "w-full text-2xl font-black mb-8 before:content-['#'] before:mr-1 before:text-primary break-before-page";
  stitle1.innerText = titleText;

  const bodyTitle = document.createElement("div");
  bodyTitle.className = "w-full text-2xl font-bold text-primary mb-4";
  bodyTitle.innerText = "Contents";

  const body = document.createElement("div");
  body.className = "leading-relaxed markdown-body";
  body.innerHTML = english;

  const translation = document.createElement("div");
  translation.className = "markdown-body markdown-body-sm p-4 !bg-base-200";
  translation.innerHTML = korean;

  const stitle2 = document.createElement("div");
  stitle2.className =
    "w-full text-2xl font-black mb-8 before:content-['#'] before:mr-1 before:text-primary break-before-page";
  stitle2.innerText = titleText;

  const quizListTitle = document.createElement("div");
  quizListTitle.className = "w-full text-2xl font-bold text-primary mb-4";
  quizListTitle.innerText = "Quiz";

  const quizlist = document.createElement("ol");
  quizlist.className = "w-full max-w-5xl flex flex-col text-sm";
  quizzes.forEach((q, index) => {
    const quiz = document.createElement("li");
    quiz.className = "break-inside-avoid pb-6";

    const quizTitle = document.createElement("div");
    quizTitle.className = "font-bold mb-2";

    const quizIndex = document.createElement("span");
    quizIndex.className = "font-black text-primary";
    quizIndex.innerText = `${index + 1}. `;

    quizTitle.appendChild(quizIndex);
    quizTitle.innerHTML += q.quiz;

    const optionList = document.createElement("ol");
    optionList.className = "flex flex-col gap-2 list-decimal list-inside";

    q.options.forEach((o) => {
      const option = document.createElement("li");
      option.className = "font-medium";
      option.innerText = o;
      optionList.appendChild(option);
    });

    const answer = document.createElement("div");
    answer.className = "text-xs w-full text-right mt-2";
    const a = document.createElement("span");
    a.className = "font-medium text-primary";
    a.innerText = "A. ";
    answer.appendChild(a);
    answer.innerHTML += q.answer;

    quiz.appendChild(quizTitle);
    quiz.appendChild(optionList);
    quiz.appendChild(answer);

    quizlist.appendChild(quiz);
  });

  const footer = document.createElement("footer");
  footer.className =
    "flex justify-between items-center w-full text-xs font-medium text-primary print-footer";
  const footerTitle = document.createElement("div");
  footerTitle.innerText = titleText;
  const footerSite = document.createElement("div");
  footerSite.innerText = "https://wordy.vercel.app";

  footer.appendChild(footerTitle);
  footer.appendChild(footerSite);

  print.appendChild(title);
  print.appendChild(wordListTitle);
  print.appendChild(wordlist);

  print.appendChild(stitle1);
  print.appendChild(bodyTitle);
  print.appendChild(body);
  print.appendChild(translation);

  print.appendChild(stitle2);
  print.appendChild(quizListTitle);
  print.appendChild(quizlist);

  print.appendChild(footer);

  document.body.appendChild(print);

  window.print();

  document.body.removeChild(print);
};
