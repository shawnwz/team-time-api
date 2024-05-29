-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "photo" TEXT,
    "timezone" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "create_at" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Team" (
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Team_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "Teams_Users" (
    "user_id" TEXT NOT NULL,
    "team_name" TEXT NOT NULL,
    "created" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Teams_Users_pkey" PRIMARY KEY ("user_id","team_name")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_provider_provider_account_id_key" ON "User"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "Team_name_key" ON "Team"("name");

-- AddForeignKey
ALTER TABLE "Teams_Users" ADD CONSTRAINT "Teams_Users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Teams_Users" ADD CONSTRAINT "Teams_Users_team_name_fkey" FOREIGN KEY ("team_name") REFERENCES "Team"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
