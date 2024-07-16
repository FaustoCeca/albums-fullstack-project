/*
  Warnings:

  - Added the required column `listens` to the `Album` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Album" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "author" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "genreId" INTEGER NOT NULL,
    "listens" BIGINT NOT NULL,
    CONSTRAINT "Album_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Album" ("author", "genreId", "id", "name") SELECT "author", "genreId", "id", "name" FROM "Album";
DROP TABLE "Album";
ALTER TABLE "new_Album" RENAME TO "Album";
CREATE UNIQUE INDEX "Album_name_key" ON "Album"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
