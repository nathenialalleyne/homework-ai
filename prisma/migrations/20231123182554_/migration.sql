/*
  Warnings:

  - The primary key for the `Assignment` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `WritingSamples` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "sourceId" TEXT NOT NULL
);
INSERT INTO "new_Assignment" ("createdAt", "id", "sourceId", "updatedAt", "user") SELECT "createdAt", "id", "sourceId", "updatedAt", "user" FROM "Assignment";
DROP TABLE "Assignment";
ALTER TABLE "new_Assignment" RENAME TO "Assignment";
CREATE TABLE "new_WritingSamples" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_WritingSamples" ("createdAt", "fileName", "id", "updatedAt", "user") SELECT "createdAt", "fileName", "id", "updatedAt", "user" FROM "WritingSamples";
DROP TABLE "WritingSamples";
ALTER TABLE "new_WritingSamples" RENAME TO "WritingSamples";
CREATE INDEX "WritingSamples_user_idx" ON "WritingSamples"("user");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
