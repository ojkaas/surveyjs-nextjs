/*
  Warnings:

  - You are about to drop the column `data` on the `SurveyDefinitionData` table. All the data in the column will be lost.
  - Added the required column `jsonData` to the `SurveyDefinitionData` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SurveyDefinitionData" DROP COLUMN "data",
ADD COLUMN     "jsonData" JSONB NOT NULL;
