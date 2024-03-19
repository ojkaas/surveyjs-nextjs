/*
  Warnings:

  - You are about to drop the column `descripttion` on the `Diagnoses` table. All the data in the column will be lost.
  - Added the required column `description` to the `Diagnoses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Diagnoses" DROP COLUMN "descripttion",
ADD COLUMN     "description" TEXT NOT NULL;
