/*
  Warnings:

  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `password` VARCHAR(191) NOT NULL;

-- RenameIndex
ALTER TABLE `_prescriptiontouser` RENAME INDEX `_prescriptiontouser_AB_unique` TO `_PrescriptionToUser_AB_unique`;

-- RenameIndex
ALTER TABLE `_prescriptiontouser` RENAME INDEX `_prescriptiontouser_B_index` TO `_PrescriptionToUser_B_index`;
