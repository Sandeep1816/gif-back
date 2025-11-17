/*
  Warnings:

  - You are about to drop the column `priceCents` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "priceCents",
ADD COLUMN     "isFavourite" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "priceInr" INTEGER NOT NULL DEFAULT 0;
