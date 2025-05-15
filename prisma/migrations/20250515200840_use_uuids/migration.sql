/*
  Warnings:

  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `curiosities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `curiosity_topics` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `images` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `logs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `topics` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE `curiosities` DROP FOREIGN KEY `curiosities_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `curiosities` DROP FOREIGN KEY `curiosities_userId_fkey`;

-- DropForeignKey
ALTER TABLE `curiosity_topics` DROP FOREIGN KEY `curiosity_topics_curiosityId_fkey`;

-- DropForeignKey
ALTER TABLE `curiosity_topics` DROP FOREIGN KEY `curiosity_topics_topicId_fkey`;

-- DropForeignKey
ALTER TABLE `images` DROP FOREIGN KEY `images_curiosityId_fkey`;

-- DropForeignKey
ALTER TABLE `logs` DROP FOREIGN KEY `logs_userId_fkey`;

-- DropIndex
DROP INDEX `curiosities_categoryId_fkey` ON `curiosities`;

-- DropIndex
DROP INDEX `curiosities_userId_fkey` ON `curiosities`;

-- DropIndex
DROP INDEX `curiosity_topics_topicId_fkey` ON `curiosity_topics`;

-- DropIndex
DROP INDEX `images_curiosityId_fkey` ON `images`;

-- DropIndex
DROP INDEX `logs_userId_fkey` ON `logs`;

-- AlterTable
ALTER TABLE `categories` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `curiosities` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    MODIFY `categoryId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `curiosity_topics` DROP PRIMARY KEY,
    MODIFY `curiosityId` VARCHAR(191) NOT NULL,
    MODIFY `topicId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`curiosityId`, `topicId`);

-- AlterTable
ALTER TABLE `images` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `curiosityId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `logs` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    MODIFY `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `topics` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `users` DROP PRIMARY KEY,
    MODIFY `id` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `curiosities` ADD CONSTRAINT `curiosities_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `curiosities` ADD CONSTRAINT `curiosities_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `images` ADD CONSTRAINT `images_curiosityId_fkey` FOREIGN KEY (`curiosityId`) REFERENCES `curiosities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `curiosity_topics` ADD CONSTRAINT `curiosity_topics_curiosityId_fkey` FOREIGN KEY (`curiosityId`) REFERENCES `curiosities`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `curiosity_topics` ADD CONSTRAINT `curiosity_topics_topicId_fkey` FOREIGN KEY (`topicId`) REFERENCES `topics`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `logs` ADD CONSTRAINT `logs_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
