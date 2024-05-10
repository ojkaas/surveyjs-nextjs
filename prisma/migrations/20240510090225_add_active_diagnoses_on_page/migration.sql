-- CreateTable
CREATE TABLE "_DiagnosesToSurveyPage" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DiagnosesToSurveyPage_AB_unique" ON "_DiagnosesToSurveyPage"("A", "B");

-- CreateIndex
CREATE INDEX "_DiagnosesToSurveyPage_B_index" ON "_DiagnosesToSurveyPage"("B");

-- AddForeignKey
ALTER TABLE "_DiagnosesToSurveyPage" ADD CONSTRAINT "_DiagnosesToSurveyPage_A_fkey" FOREIGN KEY ("A") REFERENCES "Diagnoses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DiagnosesToSurveyPage" ADD CONSTRAINT "_DiagnosesToSurveyPage_B_fkey" FOREIGN KEY ("B") REFERENCES "SurveyPage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
