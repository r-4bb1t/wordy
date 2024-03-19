import { WordType } from "../types/result";
import { load } from "cheerio";

export const emphasize = (text: string, words: WordType[]): string => {
  const wordRegex = new RegExp(
    `(?<!\\[.*?)(${words.map((word) => word.word).join("|")})(?!.*?\\])`,
    "gi"
  );

  const t = text.replace(wordRegex, (match) => {
    return `<span class="highlight"><span class="ttip">${match}</span>${match}</span>`;
  });

  const $ = load(t);
  words.forEach((word) => {
    const firstLetterUpperCase =
      word.word[0].toUpperCase() + word.word.slice(1);
    $(`span.highlight:contains(${word.word})`).each((_, elem) => {
      $(elem).find(".ttip").text(word.meaning);
    });
    $(`span.highlight:contains(${firstLetterUpperCase})`).each((_, elem) => {
      $(elem).find(".ttip").text(word.meaning);
    });
  });
  return $.html();
};
