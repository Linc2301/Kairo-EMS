/*
  Warnings:

  - You are about to alter the column `photo` on the `event` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.
  - You are about to alter the column `photo` on the `floralservice` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.
  - You are about to alter the column `photo` on the `timepackage` table. The data in that column could be lost. The data in that column will be cast from `LongBlob` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `event` MODIFY `photo` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `floralservice` MODIFY `photo` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `timepackage` MODIFY `photo` VARCHAR(191) NOT NULL;
