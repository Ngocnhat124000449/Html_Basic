-- DropIndex
DROP INDEX "Tag_name_key";

-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "part" TEXT,
ADD COLUMN     "track" TEXT NOT NULL DEFAULT 'html';

-- CreateIndex
CREATE UNIQUE INDEX "Tag_track_name_key" ON "Tag"("track", "name");

