/*
  Warnings:

  - You are about to drop the `SurveyAnswer` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `pageId` to the `SurveyQuestion` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "SurveyAnswer" DROP CONSTRAINT "SurveyAnswer_surveyQuestionId_fkey";

-- DropForeignKey
ALTER TABLE "WeightedDiagnose" DROP CONSTRAINT "WeightedDiagnose_surveyAnswerId_fkey";

-- AlterTable
ALTER TABLE "SurveyQuestion" ADD COLUMN     "pageId" TEXT NOT NULL;

-- DropTable
DROP TABLE "SurveyAnswer";

-- CreateTable
CREATE TABLE "SurveyPage" (
    "id" TEXT NOT NULL,
    "surveyDefId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SurveyPage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurveyQuestionOption" (
    "id" TEXT NOT NULL,
    "surveyQuestionId" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "text" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SurveyQuestionOption_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SurveyPage" ADD CONSTRAINT "SurveyPage_surveyDefId_fkey" FOREIGN KEY ("surveyDefId") REFERENCES "SurveyDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyQuestion" ADD CONSTRAINT "SurveyQuestion_pageId_fkey" FOREIGN KEY ("pageId") REFERENCES "SurveyPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyQuestionOption" ADD CONSTRAINT "SurveyQuestionOption_surveyQuestionId_fkey" FOREIGN KEY ("surveyQuestionId") REFERENCES "SurveyQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeightedDiagnose" ADD CONSTRAINT "WeightedDiagnose_surveyAnswerId_fkey" FOREIGN KEY ("surveyAnswerId") REFERENCES "SurveyQuestionOption"("id") ON DELETE CASCADE ON UPDATE CASCADE;
