export const emphasize = (text: string, words: string[]) => {
  const regex = new RegExp(`(${words.join("|")})`, "gi");
  return text.replace(regex, `<span class="highlight">$1</span>`);
};
