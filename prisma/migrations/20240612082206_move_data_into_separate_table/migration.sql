-- CreateTable
CREATE TABLE "SurveyDefinitionData" (
    "id" TEXT NOT NULL,
    "surveyDefId" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SurveyDefinitionData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SurveyDefinitionData_surveyDefId_key" ON "SurveyDefinitionData"("surveyDefId");

-- AddForeignKey
ALTER TABLE "SurveyDefinitionData" ADD CONSTRAINT "SurveyDefinitionData_surveyDefId_fkey" FOREIGN KEY ("surveyDefId") REFERENCES "SurveyDefinition"("id") ON DELETE CASCADE ON UPDATE CASCADE;
