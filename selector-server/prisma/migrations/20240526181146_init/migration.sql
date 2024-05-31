-- CreateTable
CREATE TABLE "Validator" (
    "validator_id" TEXT NOT NULL,
    "validator_address" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "flag" TEXT NOT NULL,
    "validator_state" TEXT NOT NULL,

    CONSTRAINT "Validator_pkey" PRIMARY KEY ("validator_id")
);

-- CreateTable
CREATE TABLE "Address" (
    "address" TEXT NOT NULL,
    "coins_in_stock" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "coins_in_stack" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("address")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "trans_id" TEXT NOT NULL,
    "sender_address" TEXT NOT NULL,
    "receiver_address" TEXT NOT NULL,
    "trans_coins" DOUBLE PRECISION NOT NULL,
    "trans_tax" DOUBLE PRECISION NOT NULL,
    "trans_timestamp" TIMESTAMP(3) NOT NULL,
    "trans_state" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("trans_id")
);

-- CreateTable
CREATE TABLE "ValidatorTransaction" (
    "trans_id" TEXT NOT NULL,
    "validator_id" TEXT NOT NULL,
    "validator_tax" DOUBLE PRECISION NOT NULL,
    "validation" TEXT NOT NULL,

    CONSTRAINT "ValidatorTransaction_pkey" PRIMARY KEY ("trans_id","validator_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Validator_validator_address_key" ON "Validator"("validator_address");

-- AddForeignKey
ALTER TABLE "Validator" ADD CONSTRAINT "Validator_validator_address_fkey" FOREIGN KEY ("validator_address") REFERENCES "Address"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_sender_address_fkey" FOREIGN KEY ("sender_address") REFERENCES "Address"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_receiver_address_fkey" FOREIGN KEY ("receiver_address") REFERENCES "Address"("address") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValidatorTransaction" ADD CONSTRAINT "ValidatorTransaction_trans_id_fkey" FOREIGN KEY ("trans_id") REFERENCES "Transaction"("trans_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ValidatorTransaction" ADD CONSTRAINT "ValidatorTransaction_validator_id_fkey" FOREIGN KEY ("validator_id") REFERENCES "Validator"("validator_id") ON DELETE RESTRICT ON UPDATE CASCADE;
