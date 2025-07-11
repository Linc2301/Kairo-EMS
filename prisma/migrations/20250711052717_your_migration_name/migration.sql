/*
  Warnings:

  - You are about to drop the column `category_id` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `venue` table. All the data in the column will be lost.
  - You are about to drop the column `event_id` on the `venue` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `venue` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `eventId` to the `Venue` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `event` DROP FOREIGN KEY `Event_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `venue` DROP FOREIGN KEY `Venue_event_id_fkey`;

-- DropIndex
DROP INDEX `Event_category_id_fkey` ON `event`;

-- DropIndex
DROP INDEX `Venue_event_id_fkey` ON `venue`;

-- AlterTable
ALTER TABLE `event` DROP COLUMN `category_id`;

-- AlterTable
ALTER TABLE `user` ADD COLUMN `isAdmin` VARCHAR(50) NOT NULL DEFAULT 'user';

-- AlterTable
ALTER TABLE `venue` DROP COLUMN `description`,
    DROP COLUMN `event_id`,
    DROP COLUMN `price`,
    ADD COLUMN `eventId` INTEGER NOT NULL,
    ADD COLUMN `photo` VARCHAR(191) NULL;

-- DropTable
DROP TABLE `category`;

-- CreateTable
CREATE TABLE `VenueType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `description` TEXT NOT NULL,
    `price` VARCHAR(255) NOT NULL,
    `venue_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Venue` ADD CONSTRAINT `Venue_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `Event`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `VenueType` ADD CONSTRAINT `VenueType_venue_id_fkey` FOREIGN KEY (`venue_id`) REFERENCES `Venue`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
