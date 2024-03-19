/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Diagnoses` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Diagnoses" ALTER COLUMN "description" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Diagnoses_name_key" ON "Diagnoses"("name");
