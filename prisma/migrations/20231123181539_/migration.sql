/*
  Warnings:

  - Added the required column `gcpFileName` to the `Source` table without a default value. This is not possible if the table is not empty.
  - Made the column `vectorPrefix` on table `Source` required. This step will fail if there are existing NULL values in that column.

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
    "gcpFileName" TEXT NOT NULL
);
INSERT INTO "new_Source" ("createdAt", "id", "name", "updatedAt", "userID", "vectorPrefix") SELECT "createdAt", "id", "name", "updatedAt", "userID", "vectorPrefix" FROM "Source";
DROP TABLE "Source";
ALTER TABLE "new_Source" RENAME TO "Source";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
