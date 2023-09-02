/*
  Warnings:

  - You are about to drop the column `account_identifier` on the `Credential` table. All the data in the column will be lost.
  - Added the required column `accountIdentifier` to the `Credential` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Credential" DROP COLUMN "account_identifier",
ADD COLUMN     "accountIdentifier" TEXT NOT NULL;
