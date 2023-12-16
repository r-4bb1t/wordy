import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const articles = await prisma.article.findMany();
  return Response.json({ articles });
}
