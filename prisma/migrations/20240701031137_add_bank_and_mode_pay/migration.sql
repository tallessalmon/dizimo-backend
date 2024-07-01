/*
  Warnings:

  - Added the required column `bank` to the `Tithe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mode_pay` to the `Tithe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Tithe` ADD COLUMN `bank` VARCHAR(191) NOT NULL,
    ADD COLUMN `mode_pay` VARCHAR(191) NOT NULL;
