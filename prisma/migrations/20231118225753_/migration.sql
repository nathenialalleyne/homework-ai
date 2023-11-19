/*
  Warnings:

  - You are about to alter the column `signUpDate` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Int` to `DateTime`.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "signUpDate" DATETIME NOT NULL,
    "actionsRemaining" INTEGER NOT NULL,
    "accountType" TEXT NOT NULL
);
INSERT INTO "new_User" ("accountType", "actionsRemaining", "id", "signUpDate") SELECT "accountType", "actionsRemaining", "id", "signUpDate" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
