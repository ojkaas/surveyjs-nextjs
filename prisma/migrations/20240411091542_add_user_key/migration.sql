/*
  Warnings:

  - A unique constraint covering the columns `[key]` on the table `Survey` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Survey" ADD COLUMN     "key" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Survey_key_key" ON "Survey"("key");
