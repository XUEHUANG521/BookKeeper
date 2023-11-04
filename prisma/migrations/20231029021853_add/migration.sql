/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `User` table. All the data in the column will be lost.
  - The primary key for the `UserExpenseTransactionRecord` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserExpenseTransactionRecord` table. All the data in the column will be lost.
  - The primary key for the `UserIncomeTransactionRecord` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `UserIncomeTransactionRecord` table. All the data in the column will be lost.
  - You are about to drop the `UserTransactionRecord` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `UserExpenseTransactionRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recordId` to the `UserExpenseTransactionRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionTime` to the `UserExpenseTransactionRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserExpenseTransactionRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `UserIncomeTransactionRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `recordId` to the `UserIncomeTransactionRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `transactionTime` to the `UserIncomeTransactionRecord` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `UserIncomeTransactionRecord` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UserTransactionRecord` DROP FOREIGN KEY `UserTransactionRecord_userId_fkey`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `name`,
    DROP COLUMN `role`,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `UserExpenseTransactionRecord` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `categoryName` VARCHAR(191) NULL,
    ADD COLUMN `recordId` INTEGER NOT NULL,
    ADD COLUMN `transactionTime` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`recordId`, `userId`, `categoryId`);

-- AlterTable
ALTER TABLE `UserIncomeTransactionRecord` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD COLUMN `categoryId` INTEGER NOT NULL,
    ADD COLUMN `categoryName` VARCHAR(191) NULL,
    ADD COLUMN `recordId` INTEGER NOT NULL,
    ADD COLUMN `transactionTime` DATETIME(3) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`recordId`, `userId`, `categoryId`);

-- DropTable
DROP TABLE `UserTransactionRecord`;

-- CreateTable
CREATE TABLE `SupportRole` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `SupportRole_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserTransaction` (
    `recordId` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `categoryId` INTEGER NOT NULL,
    `categoryName` VARCHAR(191) NULL,
    `amount` INTEGER NOT NULL,
    `transactionTime` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`recordId`, `userId`, `categoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserSupportRole` (
    `userId` INTEGER NOT NULL,
    `roleId` INTEGER NOT NULL,

    PRIMARY KEY (`userId`, `roleId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NULL,

    UNIQUE INDEX `Category_id_name_key`(`id`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `UserTransaction` ADD CONSTRAINT `UserTransaction_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserTransaction` ADD CONSTRAINT `UserTransaction_categoryId_categoryName_fkey` FOREIGN KEY (`categoryId`, `categoryName`) REFERENCES `Category`(`id`, `name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserIncomeTransactionRecord` ADD CONSTRAINT `UserIncomeTransactionRecord_recordId_userId_categoryId_fkey` FOREIGN KEY (`recordId`, `userId`, `categoryId`) REFERENCES `UserTransaction`(`recordId`, `userId`, `categoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserIncomeTransactionRecord` ADD CONSTRAINT `UserIncomeTransactionRecord_categoryId_categoryName_fkey` FOREIGN KEY (`categoryId`, `categoryName`) REFERENCES `Category`(`id`, `name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserExpenseTransactionRecord` ADD CONSTRAINT `UserExpenseTransactionRecord_recordId_userId_categoryId_fkey` FOREIGN KEY (`recordId`, `userId`, `categoryId`) REFERENCES `UserTransaction`(`recordId`, `userId`, `categoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserExpenseTransactionRecord` ADD CONSTRAINT `UserExpenseTransactionRecord_categoryId_categoryName_fkey` FOREIGN KEY (`categoryId`, `categoryName`) REFERENCES `Category`(`id`, `name`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSupportRole` ADD CONSTRAINT `UserSupportRole_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserSupportRole` ADD CONSTRAINT `UserSupportRole_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `SupportRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
