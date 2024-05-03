/*
  Warnings:

  - A unique constraint covering the columns `[surveyAnswerId,diagnoseId]` on the table `WeightedDiagnose` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "WeightedDiagnose_surveyAnswerId_diagnoseId_key" ON "WeightedDiagnose"("surveyAnswerId", "diagnoseId");
