/*
  Warnings:

  - Changed the type of `fromLat` on the `Ride` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `fromLng` on the `Ride` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `toLat` on the `Ride` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `toLng` on the `Ride` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Ride" DROP CONSTRAINT "Ride_driverId_fkey";

-- AlterTable
ALTER TABLE "Ride" ALTER COLUMN "driverId" DROP NOT NULL,
DROP COLUMN "fromLat",
ADD COLUMN     "fromLat" DOUBLE PRECISION NOT NULL,
DROP COLUMN "fromLng",
ADD COLUMN     "fromLng" DOUBLE PRECISION NOT NULL,
DROP COLUMN "toLat",
ADD COLUMN     "toLat" DOUBLE PRECISION NOT NULL,
DROP COLUMN "toLng",
ADD COLUMN     "toLng" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "Ride" ADD CONSTRAINT "Ride_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;
