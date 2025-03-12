/*
  Warnings:

  - The values [OPTICIEN,HUISARTS,NEUROLOOG] on the enum `PersonToContactZiekenhuis` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PersonToContactZiekenhuis_new" AS ENUM ('OOGARTS', 'OPTOMETRIST', 'ORTHOPTIST', 'BASISARTS');
ALTER TABLE "Diagnoses" ALTER COLUMN "personToContactZiekenhuis" DROP DEFAULT;
ALTER TABLE "Diagnoses" ALTER COLUMN "personToContactZiekenhuis" TYPE "PersonToContactZiekenhuis_new" USING ("personToContactZiekenhuis"::text::"PersonToContactZiekenhuis_new");
ALTER TYPE "PersonToContactZiekenhuis" RENAME TO "PersonToContactZiekenhuis_old";
ALTER TYPE "PersonToContactZiekenhuis_new" RENAME TO "PersonToContactZiekenhuis";
DROP TYPE "PersonToContactZiekenhuis_old";
ALTER TABLE "Diagnoses" ALTER COLUMN "personToContactZiekenhuis" SET DEFAULT 'OOGARTS';
COMMIT;
