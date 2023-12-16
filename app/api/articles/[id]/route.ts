import { QuizType, WordType } from "@/app/types/result";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id") || "";
  const article = await prisma.article.findUnique({ where: { id } });
  return Response.json({ article });
}

export async function PUT(request: NextRequest) {
  const {
    en,
    ko,
    words,
    quizzes,
  }: {
    id: string;
    en: string;
    ko: string;
    words: WordType[];
    quizzes: QuizType[];
  } = await request.json();
  const id = request.nextUrl.searchParams.get("id") || "";
  const article = await prisma.article.update({
    where: { id },
    data: {
      en,
      ko,
      words: JSON.stringify(words),
      quizzes: JSON.stringify(quizzes),
    },
  });
  return Response.json({ article });
}
