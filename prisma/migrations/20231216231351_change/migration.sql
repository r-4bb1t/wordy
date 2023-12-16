/*
  Warnings:

  - You are about to drop the column `quizzes` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `Words` on the `Article` table. All the data in the column will be lost.
  - Added the required column `quizzes` to the `Article` table without a default value. This is not possible if the table is not empty.
  - Added the required column `words` to the `Article` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "quizzes",
DROP COLUMN "Words",
ADD COLUMN     "quizzes" TEXT NOT NULL,
ADD COLUMN     "words" TEXT NOT NULL;
