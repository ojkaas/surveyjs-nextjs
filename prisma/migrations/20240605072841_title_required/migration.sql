/*
  Warnings:

  - Made the column `title` on table `SurveyPage` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Survey" DROP CONSTRAINT "Survey_userId_fkey";

-- DropForeignKey
ALTER TABLE "WeightedDiagnose" DROP CONSTRAINT "WeightedDiagnose_diagnoseId_fkey";

-- AlterTable
ALTER TABLE "SurveyPage" ALTER COLUMN "title" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeightedDiagnose" ADD CONSTRAINT "WeightedDiagnose_diagnoseId_fkey" FOREIGN KEY ("diagnoseId") REFERENCES "Diagnoses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
