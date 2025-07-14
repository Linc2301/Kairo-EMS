/*
  Warnings:

  - Added the required column `photo` to the `FloralService` table without a default value. This is not possible if the table is not empty.
  - Added the required column `photo` to the `TimePackage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `event` MODIFY `photo` LONGBLOB NOT NULL;

-- AlterTable
ALTER TABLE `floralservice` ADD COLUMN `photo` LONGBLOB NOT NULL;

-- AlterTable
ALTER TABLE `timepackage` ADD COLUMN `photo` LONGBLOB NOT NULL;

-- AlterTable
ALTER TABLE `venuetype` ADD COLUMN `photo` VARCHAR(191) NULL;
