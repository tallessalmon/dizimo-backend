/*
  Warnings:

  - Made the column `bank_id` on table `Tithe` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Tithe` DROP FOREIGN KEY `Tithe_bank_id_fkey`;

-- AlterTable
ALTER TABLE `Tithe` MODIFY `bank_id` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Offertory` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `value` DOUBLE NOT NULL,
    `user_id` INTEGER NOT NULL,
    `community` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Tithe_user_id_fkey`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Tithe` ADD CONSTRAINT `Tithe_bank_id_fkey` FOREIGN KEY (`bank_id`) REFERENCES `Bank`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Offertory` ADD CONSTRAINT `Offertory_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
