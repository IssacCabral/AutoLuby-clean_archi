-- CreateTable
CREATE TABLE `Casas` (
    `id` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `model` VARCHAR(30) NOT NULL,
    `brand` VARCHAR(30) NOT NULL,
    `status` VARCHAR(15) NOT NULL,
    `year` INTEGER NOT NULL,
    `km` DOUBLE NOT NULL,
    `color` VARCHAR(20) NOT NULL,
    `chassis` VARCHAR(50) NOT NULL,
    `cost_price` DOUBLE NOT NULL,
    `sale_price` DOUBLE NOT NULL,

    UNIQUE INDEX `Casas_id_key`(`id`),
    UNIQUE INDEX `Casas_chassis_key`(`chassis`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
