/*
  Warnings:

  - A unique constraint covering the columns `[cpf]` on the table `Tithers` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf` to the `Tithers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Tithers` ADD COLUMN `cpf` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Tithers_cpf_key` ON `Tithers`(`cpf`);
