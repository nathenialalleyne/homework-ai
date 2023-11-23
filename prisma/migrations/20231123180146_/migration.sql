/*
  Warnings:

  - You are about to drop the `UserSources` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `userSourcesId` on the `Source` table. All the data in the column will be lost.
  - Added the required column `userID` to the `Source` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserSources";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Source" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "userID" TEXT NOT NULL,
    "vectorPrefix" TEXT
);
INSERT INTO "new_Source" ("createdAt", "id", "name", "updatedAt", "vectorPrefix") SELECT "createdAt", "id", "name", "updatedAt", "vectorPrefix" FROM "Source";
DROP TABLE "Source";
ALTER TABLE "new_Source" RENAME TO "Source";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
