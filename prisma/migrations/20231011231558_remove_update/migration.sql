/*
  Warnings:

  - You are about to drop the column `updated_at` on the `Task` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "text" TEXT NOT NULL,
    "starred" BOOLEAN NOT NULL DEFAULT false,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "starred_at" DATETIME,
    "completed_at" DATETIME
);
INSERT INTO "new_Task" ("completed", "completed_at", "created_at", "id", "starred", "starred_at", "text") SELECT "completed", "completed_at", "created_at", "id", "starred", "starred_at", "text" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
CREATE UNIQUE INDEX "Task_text_key" ON "Task"("text");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
