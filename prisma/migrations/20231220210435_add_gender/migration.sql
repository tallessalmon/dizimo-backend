/*
  Warnings:

  - Added the required column `gender` to the `Tithers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Tithers` ADD COLUMN `gender` VARCHAR(191) NOT NULL;
