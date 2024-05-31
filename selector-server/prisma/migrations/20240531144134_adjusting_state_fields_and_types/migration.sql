/*
  Warnings:

  - The `trans_state` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `flag` column on the `Validator` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `validator_state` column on the `Validator` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ValidatorState" AS ENUM ('INACTIVE', 'VALIDATING', 'FREE');

-- CreateEnum
CREATE TYPE "TransactionState" AS ENUM ('NOT_VALIDATED', 'DENIED', 'APPROVED');

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "trans_state",
ADD COLUMN     "trans_state" "TransactionState" NOT NULL DEFAULT 'NOT_VALIDATED';

-- AlterTable
ALTER TABLE "Validator" ALTER COLUMN "host" DROP NOT NULL,
DROP COLUMN "flag",
ADD COLUMN     "flag" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "validator_state",
ADD COLUMN     "validator_state" "ValidatorState" NOT NULL DEFAULT 'INACTIVE';
