-- AlterTable
ALTER TABLE "Survey" ADD COLUMN     "surveyDefId" TEXT;

-- AddForeignKey
ALTER TABLE "Survey" ADD CONSTRAINT "Survey_surveyDefId_fkey" FOREIGN KEY ("surveyDefId") REFERENCES "SurveyDefinition"("id") ON DELETE SET NULL ON UPDATE CASCADE;
