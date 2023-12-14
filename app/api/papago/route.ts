export async function POST(request: Request) {
  const { text } = await request.json();
  const response = await fetch(`https://openapi.naver.com/v1/papago/n2mt`, {
    method: "POST",
    headers: {
      "X-Naver-Client-Id": process.env.NAVER_CLIENT_ID || "",
      "X-Naver-Client-Secret": process.env.NAVER_CLIENT_SECRET || "",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source: "en",
      target: "ko",
      text,
    }),
  });
  const json = await response.json();
  console.log(json);
  return Response.json(json);
}
