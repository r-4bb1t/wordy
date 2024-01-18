import { WordType } from "../types/result";
import { load } from "cheerio";

export const emphasize = (text: string, words: WordType[]) => {
  const regex = new RegExp(
    `(${words.map((word) => word.word).join("|")})`,
    "gi"
  );
  const t = text.replace(
    regex,
    `<span class="highlight"><span class="ttip">$1</span>$1</span>`
  );
  // find all the words in the text and append the tooltip
  const $ = load(t);
  words.forEach((word) => {
    $(`span.highlight:contains(${word.word})`).each((i, elem) => {
      $(elem).find(".ttip").text(word.meaning);
    });
  });
  return $.html();
};
