export async function POST(request: Request) {
  const { text } = await request.json();
  const response = await fetch(`https://api-free.deepl.com/v2/translate`, {
    method: "POST",
    headers: {
      Authorization: "DeepL-Auth-Key " + process.env.DEEPL_AUTH_KEY,
      "Content-Type": "application/json",
      credentials: "include",
    },
    body: JSON.stringify({
      target_lang: "ko",
      text: [text],
    }),
    cache: "no-store",
  });
  const json = await response.json();
  return Response.json({ message: json.translations[0].text });
}
