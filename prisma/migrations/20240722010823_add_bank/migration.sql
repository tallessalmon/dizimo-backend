/*
  Warnings:

  - You are about to drop the column `bank` on the `Tithe` table. All the data in the column will be lost.
  - Added the required column `bank_id` to the `Tithe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Tithe` DROP COLUMN `bank`,
    ADD COLUMN `bank_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `Bank` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `code` INTEGER NOT NULL,
    `bank_name` VARCHAR(191) NOT NULL,
    `owner_account_name` VARCHAR(191) NOT NULL,
    `agency` VARCHAR(191) NOT NULL,
    `account` VARCHAR(191) NOT NULL,
    `pix_key` VARCHAR(191) NOT NULL,
    `status` BOOLEAN NOT NULL DEFAULT true,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `Tithe_bank_id_fkey` ON `Tithe`(`bank_id`);

-- AddForeignKey
ALTER TABLE `Tithe` ADD CONSTRAINT `Tithe_bank_id_fkey` FOREIGN KEY (`bank_id`) REFERENCES `Bank`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
