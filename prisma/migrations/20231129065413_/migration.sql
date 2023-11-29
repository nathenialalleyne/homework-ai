/*
  Warnings:

  - You are about to drop the column `sourceId` on the `Assignment` table. All the data in the column will be lost.
  - Added the required column `name` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Source" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userID" TEXT NOT NULL,
    "vectorPrefix" TEXT NOT NULL,
    "gcpFileName" TEXT NOT NULL,
    "assignmentId" TEXT,
    CONSTRAINT "Source_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Source" ("createdAt", "gcpFileName", "id", "name", "updatedAt", "userID", "vectorPrefix") SELECT "createdAt", "gcpFileName", "id", "name", "updatedAt", "userID", "vectorPrefix" FROM "Source";
DROP TABLE "Source";
ALTER TABLE "new_Source" RENAME TO "Source";
CREATE TABLE "new_Assignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Assignment" ("createdAt", "id", "updatedAt", "user") SELECT "createdAt", "id", "updatedAt", "user" FROM "Assignment";
DROP TABLE "Assignment";
ALTER TABLE "new_Assignment" RENAME TO "Assignment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
