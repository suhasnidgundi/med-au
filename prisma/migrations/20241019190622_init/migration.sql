-- CreateTable
CREATE TABLE `account` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `provider` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `refresh_token` TEXT NULL,
    `access_token` TEXT NULL,
    `expires_at` INTEGER NULL,
    `token_type` VARCHAR(191) NULL,
    `scope` VARCHAR(191) NULL,
    `id_token` TEXT NULL,
    `session_state` VARCHAR(191) NULL,
    `refresh_token_expires_in` INTEGER NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Account_userId_key`(`userId`),
    INDEX `Account_userId_idx`(`userId`),
    UNIQUE INDEX `Account_provider_providerAccountId_key`(`provider`, `providerAccountId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aiinteractionlog` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `session_id` VARCHAR(191) NOT NULL,
    `interaction_type` VARCHAR(191) NOT NULL,
    `input_data` JSON NOT NULL,
    `output_data` JSON NOT NULL,
    `confidence_score` DOUBLE NOT NULL,
    `processing_time` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `AIInteractionLog_session_id_idx`(`session_id`),
    INDEX `AIInteractionLog_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `aitrainingdata` (
    `id` VARCHAR(191) NOT NULL,
    `symptom_pattern` JSON NOT NULL,
    `diagnosis` VARCHAR(191) NOT NULL,
    `confidence_score` DOUBLE NOT NULL,
    `verified_by_doctor` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `allergy` (
    `id` VARCHAR(191) NOT NULL,
    `medicalHistoryId` VARCHAR(191) NOT NULL,
    `allergen` VARCHAR(191) NOT NULL,
    `severity` VARCHAR(191) NOT NULL,
    `reaction` VARCHAR(191) NOT NULL,
    `diagnosed_date` DATETIME(3) NULL,
    `notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Allergy_medicalHistoryId_idx`(`medicalHistoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `appointment` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `doctorId` VARCHAR(191) NOT NULL,
    `consultation_type` ENUM('AI_ONLY', 'AI_WITH_DOCTOR_REVIEW', 'EMERGENCY', 'SPECIALIST_REFERRAL', 'FOLLOW_UP') NOT NULL,
    `scheduled_date` DATETIME(3) NOT NULL,
    `duration` INTEGER NOT NULL,
    `status` ENUM('SCHEDULED', 'CONFIRMED', 'COMPLETED', 'CANCELLED', 'RESCHEDULED', 'NO_SHOW') NOT NULL,
    `reason` TEXT NOT NULL,
    `notes` TEXT NULL,
    `reminders_sent` JSON NOT NULL,
    `video_call_link` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `Appointment_doctorId_idx`(`doctorId`),
    INDEX `Appointment_scheduled_date_idx`(`scheduled_date`),
    INDEX `Appointment_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auditlog` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `action` VARCHAR(191) NOT NULL,
    `resource_type` VARCHAR(191) NOT NULL,
    `resource_id` VARCHAR(191) NOT NULL,
    `details` JSON NOT NULL,
    `ip_address` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `AuditLog_resource_type_resource_id_idx`(`resource_type`, `resource_id`),
    INDEX `AuditLog_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `authenticator` (
    `credentialID` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `providerAccountId` VARCHAR(191) NOT NULL,
    `credentialPublicKey` VARCHAR(191) NOT NULL,
    `counter` INTEGER NOT NULL,
    `credentialDeviceType` VARCHAR(191) NOT NULL,
    `credentialBackedUp` BOOLEAN NOT NULL,
    `transports` VARCHAR(191) NULL,

    UNIQUE INDEX `Authenticator_credentialID_key`(`credentialID`),
    PRIMARY KEY (`userId`, `credentialID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `chroniccondition` (
    `id` VARCHAR(191) NOT NULL,
    `medicalHistoryId` VARCHAR(191) NOT NULL,
    `condition` VARCHAR(191) NOT NULL,
    `diagnosed_date` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL,
    `notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `ChronicCondition_medicalHistoryId_idx`(`medicalHistoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `consultation` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `symptoms` JSON NOT NULL,
    `initial_complaint` TEXT NOT NULL,
    `ai_diagnosis` JSON NOT NULL,
    `consultation_notes` TEXT NULL,
    `vitals` JSON NULL,
    `status` ENUM('INITIATED', 'IN_PROGRESS', 'WAITING_DOCTOR_REVIEW', 'COMPLETED', 'REFERRED_TO_SPECIALIST', 'CANCELLED') NOT NULL,
    `consultation_type` ENUM('AI_ONLY', 'AI_WITH_DOCTOR_REVIEW', 'EMERGENCY', 'SPECIALIST_REFERRAL', 'FOLLOW_UP') NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `Consultation_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `doctorreview` (
    `id` VARCHAR(191) NOT NULL,
    `consultationId` VARCHAR(191) NOT NULL,
    `doctorId` VARCHAR(191) NOT NULL,
    `diagnosis` TEXT NOT NULL,
    `recommendations` TEXT NOT NULL,
    `treatment_plan` TEXT NOT NULL,
    `referral_needed` BOOLEAN NOT NULL DEFAULT false,
    `referral_notes` TEXT NULL,
    `doctor_notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `DoctorReview_consultationId_key`(`consultationId`),
    INDEX `DoctorReview_consultationId_idx`(`consultationId`),
    INDEX `DoctorReview_doctorId_idx`(`doctorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `familyhistory` (
    `id` VARCHAR(191) NOT NULL,
    `medicalHistoryId` VARCHAR(191) NOT NULL,
    `condition` VARCHAR(191) NOT NULL,
    `relationship` VARCHAR(191) NOT NULL,
    `diagnosed_age` INTEGER NULL,
    `notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `FamilyHistory_medicalHistoryId_idx`(`medicalHistoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `followup` (
    `id` VARCHAR(191) NOT NULL,
    `consultationId` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `scheduled_date` DATETIME(3) NOT NULL,
    `type` ENUM('CONDITION_MONITORING', 'MEDICATION_REVIEW', 'POST_PROCEDURE_CHECK', 'LAB_RESULT_REVIEW', 'CHRONIC_CARE_CHECK', 'WELLNESS_CHECK') NOT NULL,
    `status` ENUM('SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'RESCHEDULED', 'OVERDUE') NOT NULL,
    `priority` ENUM('LOW', 'NORMAL', 'HIGH', 'URGENT') NOT NULL DEFAULT 'NORMAL',
    `description` TEXT NOT NULL,
    `action_items` JSON NOT NULL,
    `completion_notes` TEXT NULL,
    `next_follow_up_needed` BOOLEAN NOT NULL DEFAULT false,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `FollowUp_consultationId_idx`(`consultationId`),
    INDEX `FollowUp_scheduled_date_idx`(`scheduled_date`),
    INDEX `FollowUp_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lifestylefactor` (
    `id` VARCHAR(191) NOT NULL,
    `medicalHistoryId` VARCHAR(191) NOT NULL,
    `factor_type` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `frequency` VARCHAR(191) NULL,
    `details` TEXT NULL,
    `start_date` DATETIME(3) NULL,
    `end_date` DATETIME(3) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `LifestyleFactor_medicalHistoryId_idx`(`medicalHistoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medicalhistory` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `MedicalHistory_userId_key`(`userId`),
    INDEX `MedicalHistory_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `medication` (
    `id` VARCHAR(191) NOT NULL,
    `medicalHistoryId` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `dosage` VARCHAR(191) NOT NULL,
    `frequency` VARCHAR(191) NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NULL,
    `status` VARCHAR(191) NOT NULL,
    `notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Medication_medicalHistoryId_idx`(`medicalHistoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prescription` (
    `id` VARCHAR(191) NOT NULL,
    `consultationId` VARCHAR(191) NOT NULL,
    `prescribedById` VARCHAR(191) NOT NULL,
    `instructions` TEXT NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NULL,
    `status` ENUM('ACTIVE', 'COMPLETED', 'CANCELLED', 'RENEWED') NOT NULL,
    `notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `Prescription_consultationId_idx`(`consultationId`),
    INDEX `Prescription_prescribedById_idx`(`prescribedById`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `prescriptionitem` (
    `id` VARCHAR(191) NOT NULL,
    `prescriptionId` VARCHAR(191) NOT NULL,
    `medication_name` VARCHAR(191) NOT NULL,
    `dosage` VARCHAR(191) NOT NULL,
    `frequency` VARCHAR(191) NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `special_instructions` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `PrescriptionItem_prescriptionId_idx`(`prescriptionId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `session` (
    `id` VARCHAR(191) NOT NULL,
    `sessionToken` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Session_sessionToken_key`(`sessionToken`),
    INDEX `Session_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `surgery` (
    `id` VARCHAR(191) NOT NULL,
    `medicalHistoryId` VARCHAR(191) NOT NULL,
    `procedure` VARCHAR(191) NOT NULL,
    `date` DATETIME(3) NOT NULL,
    `hospital` VARCHAR(191) NOT NULL,
    `surgeon` VARCHAR(191) NULL,
    `complications` TEXT NULL,
    `recovery_notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `Surgery_medicalHistoryId_idx`(`medicalHistoryId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `symptom` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` TEXT NOT NULL,
    `severity_scale` JSON NOT NULL,
    `related_conditions` JSON NOT NULL,
    `questions` JSON NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Symptom_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `symptomlog` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `symptoms` JSON NOT NULL,
    `timestamp` DATETIME(3) NOT NULL,
    `notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `SymptomLog_timestamp_idx`(`timestamp`),
    INDEX `SymptomLog_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `username` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `role` ENUM('PATIENT', 'DOCTOR', 'SPECIALIST', 'ADMIN') NOT NULL DEFAULT 'PATIENT',
    `emailVerified` DATETIME(3) NULL,
    `image` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    INDEX `User_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userprofile` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `gender` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `blood_group` VARCHAR(191) NOT NULL,
    `height` DOUBLE NOT NULL,
    `weight` DOUBLE NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `language` VARCHAR(191) NOT NULL,
    `emergency_contact` VARCHAR(191) NULL,
    `preferred_communication_mode` ENUM('APP', 'SMS', 'VOICE', 'EMAIL', 'WHATSAPP') NOT NULL DEFAULT 'APP',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `UserProfile_userId_key`(`userId`),
    INDEX `UserProfile_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `usersymptom` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `symptomId` VARCHAR(191) NOT NULL,
    `severity` INTEGER NOT NULL,
    `duration` VARCHAR(191) NOT NULL,
    `additional_notes` TEXT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `UserSymptom_symptomId_idx`(`symptomId`),
    INDEX `UserSymptom_userId_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `verificationtoken` (
    `identifier` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` DATETIME(3) NOT NULL,

    UNIQUE INDEX `VerificationToken_identifier_token_key`(`identifier`, `token`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_prescriptiontouser` (
    `A` VARCHAR(191) NOT NULL,
    `B` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `_prescriptiontouser_AB_unique`(`A`, `B`),
    INDEX `_prescriptiontouser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `account` ADD CONSTRAINT `Account_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `allergy` ADD CONSTRAINT `Allergy_medicalHistoryId_fkey` FOREIGN KEY (`medicalHistoryId`) REFERENCES `medicalhistory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `appointment` ADD CONSTRAINT `Appointment_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `authenticator` ADD CONSTRAINT `Authenticator_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `chroniccondition` ADD CONSTRAINT `ChronicCondition_medicalHistoryId_fkey` FOREIGN KEY (`medicalHistoryId`) REFERENCES `medicalhistory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `consultation` ADD CONSTRAINT `Consultation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `doctorreview` ADD CONSTRAINT `DoctorReview_consultationId_fkey` FOREIGN KEY (`consultationId`) REFERENCES `consultation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `familyhistory` ADD CONSTRAINT `FamilyHistory_medicalHistoryId_fkey` FOREIGN KEY (`medicalHistoryId`) REFERENCES `medicalhistory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `followup` ADD CONSTRAINT `FollowUp_consultationId_fkey` FOREIGN KEY (`consultationId`) REFERENCES `consultation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `followup` ADD CONSTRAINT `FollowUp_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lifestylefactor` ADD CONSTRAINT `LifestyleFactor_medicalHistoryId_fkey` FOREIGN KEY (`medicalHistoryId`) REFERENCES `medicalhistory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medicalhistory` ADD CONSTRAINT `MedicalHistory_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medication` ADD CONSTRAINT `Medication_medicalHistoryId_fkey` FOREIGN KEY (`medicalHistoryId`) REFERENCES `medicalhistory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescription` ADD CONSTRAINT `Prescription_consultationId_fkey` FOREIGN KEY (`consultationId`) REFERENCES `consultation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `prescriptionitem` ADD CONSTRAINT `PrescriptionItem_prescriptionId_fkey` FOREIGN KEY (`prescriptionId`) REFERENCES `prescription`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `session` ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `surgery` ADD CONSTRAINT `Surgery_medicalHistoryId_fkey` FOREIGN KEY (`medicalHistoryId`) REFERENCES `medicalhistory`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `symptomlog` ADD CONSTRAINT `SymptomLog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `userprofile` ADD CONSTRAINT `UserProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usersymptom` ADD CONSTRAINT `UserSymptom_symptomId_fkey` FOREIGN KEY (`symptomId`) REFERENCES `symptom`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `usersymptom` ADD CONSTRAINT `UserSymptom_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_prescriptiontouser` ADD CONSTRAINT `_prescriptiontouser_A_fkey` FOREIGN KEY (`A`) REFERENCES `prescription`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_prescriptiontouser` ADD CONSTRAINT `_prescriptiontouser_B_fkey` FOREIGN KEY (`B`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
