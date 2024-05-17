/*
  Warnings:

  - You are about to drop the column `surveyDefId` on the `Survey` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Survey" DROP CONSTRAINT "Survey_surveyDefId_fkey";

-- AlterTable
ALTER TABLE "Survey" DROP COLUMN "surveyDefId";
