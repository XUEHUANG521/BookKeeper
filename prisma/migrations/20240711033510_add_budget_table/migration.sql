/*
  Warnings:

  - The primary key for the `UserTransaction` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryName` on the `UserTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `recordId` on the `UserTransaction` table. All the data in the column will be lost.
  - You are about to drop the `UserExpenseTransactionRecord` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserIncomeTransactionRecord` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `name` on table `Category` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `id` to the `UserTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `UserTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `UserExpenseTransactionRecord` DROP FOREIGN KEY `UserExpenseTransactionRecord_categoryId_categoryName_fkey`;

-- DropForeignKey
ALTER TABLE `UserExpenseTransactionRecord` DROP FOREIGN KEY `UserExpenseTransactionRecord_recordId_userId_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `UserIncomeTransactionRecord` DROP FOREIGN KEY `UserIncomeTransactionRecord_categoryId_categoryName_fkey`;

-- DropForeignKey
ALTER TABLE `UserIncomeTransactionRecord` DROP FOREIGN KEY `UserIncomeTransactionRecord_recordId_userId_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `UserTransaction` DROP FOREIGN KEY `UserTransaction_categoryId_categoryName_fkey`;

-- DropIndex
DROP INDEX `Category_id_name_key` ON `Category`;

-- DropIndex
DROP INDEX `Role_id_role_key` ON `Role`;

-- DropIndex
DROP INDEX `UserTransaction_recordId_userId_categoryId_key` ON `UserTransaction`;

-- AlterTable
ALTER TABLE `Category` MODIFY `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `UserTransaction` DROP PRIMARY KEY,
    DROP COLUMN `categoryName`,
    DROP COLUMN `recordId`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `type` ENUM('INCOME', 'EXPENSE') NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `UserExpenseTransactionRecord`;

-- DropTable
DROP TABLE `UserIncomeTransactionRecord`;

-- CreateTable
CREATE TABLE `Budget` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `amount` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `categoryId` INTEGER NOT NULL,

    INDEX `Budget_userId_idx`(`userId`),
    INDEX `Budget_categoryId_idx`(`categoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE INDEX `UserTransaction_categoryId_idx` ON `UserTransaction`(`categoryId`);

-- CreateIndex
CREATE INDEX `UserTransaction_transactionTime_idx` ON `UserTransaction`(`transactionTime`);

-- AddForeignKey
ALTER TABLE `UserTransaction` ADD CONSTRAINT `UserTransaction_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Budget` ADD CONSTRAINT `Budget_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Budget` ADD CONSTRAINT `Budget_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `UserTransaction` RENAME INDEX `UserTransaction_userId_fkey` TO `UserTransaction_userId_idx`;
