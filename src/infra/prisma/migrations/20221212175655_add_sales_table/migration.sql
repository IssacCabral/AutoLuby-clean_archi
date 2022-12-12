-- CreateTable
CREATE TABLE `Sale` (
    `id` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `vehicleStatus` VARCHAR(191) NOT NULL,
    `saleDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` VARCHAR(191) NULL,
    `vehicleId` VARCHAR(191) NULL,

    UNIQUE INDEX `Sale_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Sale` ADD CONSTRAINT `Sale_vehicleId_fkey` FOREIGN KEY (`vehicleId`) REFERENCES `Vehicle`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
