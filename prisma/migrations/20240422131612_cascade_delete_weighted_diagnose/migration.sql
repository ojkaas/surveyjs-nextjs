-- DropForeignKey
ALTER TABLE "SurveyAnswer" DROP CONSTRAINT "SurveyAnswer_surveyQuestionId_fkey";

-- DropForeignKey
ALTER TABLE "SurveyQuestion" DROP CONSTRAINT "SurveyQuestion_surveyDefId_fkey";

-- DropForeignKey
ALTER TABLE "WeightedDiagnose" DROP CONSTRAINT "WeightedDiagnose_surveyAnswerId_fkey";

-- AddForeignKey
ALTER TABLE "SurveyQuestion" ADD CONSTRAINT "SurveyQuestion_surveyDefId_fkey" FOREIGN KEY ("surveyDefId") REFERENCES "SurveyDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurveyAnswer" ADD CONSTRAINT "SurveyAnswer_surveyQuestionId_fkey" FOREIGN KEY ("surveyQuestionId") REFERENCES "SurveyQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WeightedDiagnose" ADD CONSTRAINT "WeightedDiagnose_surveyAnswerId_fkey" FOREIGN KEY ("surveyAnswerId") REFERENCES "SurveyAnswer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
