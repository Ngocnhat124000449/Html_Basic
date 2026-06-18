-- CreateTable
CREATE TABLE "UserSettings" (
    "userId" TEXT NOT NULL,
    "dailyNew" INTEGER NOT NULL DEFAULT 5,
    "reviewCap" INTEGER NOT NULL DEFAULT 20,
    "targetRetention" DOUBLE PRECISION NOT NULL DEFAULT 0.9,
    "hiddenTracks" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "fsrsParams" JSONB,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserSettings_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "UserSettings" ADD CONSTRAINT "UserSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
