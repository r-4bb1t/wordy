import { QuizType, WordType } from "@/app/types/result";
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";


const prisma = new PrismaClient();

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const article = await prisma.article.findFirst({
    where: {
      id: params.id,
    },
  });
  return Response.json({ article });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const {
    en,
    ko,
    words,
    quizzes,
  }: {
    en: string;
    ko: string;
    words: WordType[];
    quizzes: QuizType[];
  } = await request.json();
  const article = await prisma.article.update({
    where: { id: params.id },
    data: {
      en,
      ko,
      words: JSON.stringify(words),
      quizzes: JSON.stringify(quizzes),
    },
  });
  return Response.json({ article });
}
