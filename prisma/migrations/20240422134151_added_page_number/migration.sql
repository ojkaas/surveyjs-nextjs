/*
  Warnings:

  - Added the required column `number` to the `SurveyPage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SurveyPage" ADD COLUMN     "number" INTEGER NOT NULL,
ALTER COLUMN "title" DROP NOT NULL;
