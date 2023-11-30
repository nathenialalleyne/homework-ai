/*
  Warnings:

  - Added the required column `vectorIDList` to the `Source` table without a default value. This is not possible if the table is not empty.

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
    "vectorIDList" TEXT NOT NULL,
    "gcpFileName" TEXT NOT NULL,
    "assignmentId" TEXT,
    CONSTRAINT "Source_assignmentId_fkey" FOREIGN KEY ("assignmentId") REFERENCES "Assignment" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Source" ("assignmentId", "createdAt", "gcpFileName", "id", "name", "updatedAt", "userID", "vectorPrefix") SELECT "assignmentId", "createdAt", "gcpFileName", "id", "name", "updatedAt", "userID", "vectorPrefix" FROM "Source";
DROP TABLE "Source";
ALTER TABLE "new_Source" RENAME TO "Source";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
