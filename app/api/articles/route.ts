import { QuizType, WordType } from "@/app/types/result";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const articles = await prisma.article.findMany({
    orderBy: { createdAt: "desc" },
  });

  return Response.json({ articles });
}

export async function POST(request: Request) {
  const {
    en,
    ko,
    words,
    quizzes,
  }: { en: string; ko: string; words: WordType[]; quizzes: QuizType[] } =
    await request.json();
  const article = await prisma.article.create({
    data: {
      en,
      ko,
      words: JSON.stringify(words),
      quizzes: JSON.stringify(quizzes),
    },
  });
  return Response.json({ article });
}
