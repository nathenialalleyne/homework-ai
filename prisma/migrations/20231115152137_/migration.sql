/*
  Warnings:

  - You are about to drop the column `text` on the `WritingSamples` table. All the data in the column will be lost.
  - Added the required column `filePath` to the `WritingSamples` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WritingSamples" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_WritingSamples" ("createdAt", "id", "updatedAt", "user") SELECT "createdAt", "id", "updatedAt", "user" FROM "WritingSamples";
DROP TABLE "WritingSamples";
ALTER TABLE "new_WritingSamples" RENAME TO "WritingSamples";
CREATE INDEX "WritingSamples_user_idx" ON "WritingSamples"("user");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
