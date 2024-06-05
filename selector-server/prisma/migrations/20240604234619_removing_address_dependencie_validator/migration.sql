/*
  Warnings:

  - You are about to drop the column `coins_in_stack` on the `Address` table. All the data in the column will be lost.
  - You are about to drop the column `validator_address` on the `Validator` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Validator" DROP CONSTRAINT "Validator_validator_address_fkey";

-- DropIndex
DROP INDEX "Validator_validator_address_key";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "coins_in_stack";

-- AlterTable
ALTER TABLE "Validator" DROP COLUMN "validator_address",
ADD COLUMN     "coins_in_stack" DOUBLE PRECISION NOT NULL DEFAULT 0;
