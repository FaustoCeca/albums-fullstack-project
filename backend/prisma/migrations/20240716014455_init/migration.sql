/*
  Warnings:

  - You are about to drop the column `albumId` on the `Genre` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Genre" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Genre" ("id", "name") SELECT "id", "name" FROM "Genre";
DROP TABLE "Genre";
ALTER TABLE "new_Genre" RENAME TO "Genre";
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
