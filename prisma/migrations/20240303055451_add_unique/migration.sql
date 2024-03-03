/*
  Warnings:

  - A unique constraint covering the columns `[tid]` on the table `Team` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uid]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Team_tid_key" ON "Team"("tid");

-- CreateIndex
CREATE UNIQUE INDEX "User_uid_key" ON "User"("uid");
