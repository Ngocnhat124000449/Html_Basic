-- AlterTable
ALTER TABLE "UserSettings" ADD COLUMN     "unlockedTracks" TEXT[] DEFAULT ARRAY[]::TEXT[];
