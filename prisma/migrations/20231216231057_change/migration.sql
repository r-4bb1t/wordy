/*
  Warnings:

  - You are about to drop the `ExampleSentence` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Word` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ArticleToWord` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `quizzes` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Words` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `en` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ko` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ExampleSentence" DROP CONSTRAINT "ExampleSentence_wordId_fkey";

-- DropForeignKey
ALTER TABLE "_ArticleToWord" DROP CONSTRAINT "_ArticleToWord_A_fkey";

-- DropForeignKey
ALTER TABLE "_ArticleToWord" DROP CONSTRAINT "_ArticleToWord_B_fkey";

-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "quizzes" TEXT NOT NULL,
ADD COLUMN     "Words" TEXT NOT NULL,
ADD COLUMN     "en" TEXT NOT NULL,
ADD COLUMN     "ko" TEXT NOT NULL;

-- DropTable
DROP TABLE "ExampleSentence";

-- DropTable
DROP TABLE "Word";

-- DropTable
DROP TABLE "_ArticleToWord";
