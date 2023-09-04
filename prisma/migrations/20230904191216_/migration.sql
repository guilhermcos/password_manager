/*
  Warnings:

  - You are about to drop the column `ExpiresIn` on the `Card` table. All the data in the column will be lost.
  - Added the required column `expiresIn` to the `Card` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Card` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Card" DROP COLUMN "ExpiresIn",
ADD COLUMN     "expiresIn" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Card" ADD CONSTRAINT "Card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
