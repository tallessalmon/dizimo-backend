/*
  Warnings:

  - You are about to drop the column `bank` on the `Tithe` table. All the data in the column will be lost.
  - You are about to drop the column `mode_pay` on the `Tithe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Tithe` DROP COLUMN `bank`,
    DROP COLUMN `mode_pay`;
