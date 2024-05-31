/*
  Warnings:

  - The values [NOT_VALIDATED] on the enum `TransactionState` will be removed. If these variants are still used in the database, this will fail.
  - The `validation` column on the `ValidatorTransaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ValidationState" AS ENUM ('FAILED', 'IN_PROGRESS', 'APPROVED', 'DENIED');

-- AlterEnum
BEGIN;
CREATE TYPE "TransactionState_new" AS ENUM ('NOT_STARTED', 'VALIDATING', 'DENIED', 'APPROVED');
ALTER TABLE "Transaction" ALTER COLUMN "trans_state" DROP DEFAULT;
ALTER TABLE "Transaction" ALTER COLUMN "trans_state" TYPE "TransactionState_new" USING ("trans_state"::text::"TransactionState_new");
ALTER TYPE "TransactionState" RENAME TO "TransactionState_old";
ALTER TYPE "TransactionState_new" RENAME TO "TransactionState";
DROP TYPE "TransactionState_old";
ALTER TABLE "Transaction" ALTER COLUMN "trans_state" SET DEFAULT 'NOT_STARTED';
COMMIT;

-- AlterTable
ALTER TABLE "Transaction" ALTER COLUMN "trans_state" SET DEFAULT 'NOT_STARTED';

-- AlterTable
ALTER TABLE "ValidatorTransaction" ALTER COLUMN "validator_tax" DROP NOT NULL,
DROP COLUMN "validation",
ADD COLUMN     "validation" "ValidationState" NOT NULL DEFAULT 'IN_PROGRESS';
