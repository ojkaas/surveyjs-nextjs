/*
  Warnings:

  - Added the required column `name` to the `SurveyDefinition` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SurveyDefinition" ADD COLUMN     "internalVersion" TEXT,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "data" DROP NOT NULL,
ALTER COLUMN "active" SET DEFAULT false;
