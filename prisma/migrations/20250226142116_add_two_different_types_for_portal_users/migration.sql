-- CreateEnum
CREATE TYPE "PersonToContactZiekenhuis" AS ENUM ('OOGARTS', 'OPTOMETRIST', 'OPTICIEN', 'ORTHOPTIST', 'HUISARTS', 'NEUROLOOG');

-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('HUISARTS', 'ZIEKENHUIS');

-- AlterTable
ALTER TABLE "Diagnoses" ADD COLUMN     "personToContactZiekenhuis" "PersonToContactZiekenhuis";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "UserType";
