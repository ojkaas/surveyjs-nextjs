/*
  Warnings:

  - Made the column `personToContactZiekenhuis` on table `Diagnoses` required. This step will fail if there are existing NULL values in that column.

*/
UPDATE "Diagnoses" 
SET "personToContactZiekenhuis" = 'OOGARTS' 
WHERE "personToContactZiekenhuis" IS NULL;

-- AlterTable
ALTER TABLE "Diagnoses" ALTER COLUMN "personToContactZiekenhuis" SET NOT NULL,
ALTER COLUMN "personToContactZiekenhuis" SET DEFAULT 'OOGARTS';
